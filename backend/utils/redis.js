/**
 * Redis client for user session (token) storage.
 * - On login: store token in Redis with TTL.
 * - On logout: delete token from Redis.
 * If REDIS_URL is not set, methods no-op (login still returns token; logout still returns success).
 */

const Redis = require('ioredis');

const PREFIX = 'user:session:';
const DEFAULT_TTL_SECONDS = 7 * 24 * 60 * 60; // 7 days

let client = null;
let isHealthy = false;

/**
 * Get Redis client. Connects once using REDIS_URL.
 * @returns {Redis|null} Redis client or null if REDIS_URL not set
 */
function getRedisClient() {
  if (client !== null) return client;
  const url = process.env.REDIS_URL;
  if (!url || url.trim() === '') {
    return null;
  }
  try {
    client = new Redis(url, {
      maxRetriesPerRequest: 3,
      retryStrategy(times) {
        if (times > 3) return null;
        return Math.min(times * 200, 2000);
      },
    });
    client.on('ready', () => {
      isHealthy = true;
      console.log('Redis connected: ready');
    });
    client.on('error', (err) => {
      isHealthy = false;
      console.error('Redis error:', err.message);
    });
    client.on('end', () => {
      isHealthy = false;
      console.error('Redis connection ended');
    });
    return client;
  } catch (err) {
    console.error('Redis connection failed:', err.message);
    return null;
  }
}

/**
 * Store user session token in Redis.
 * @param {string} token - JWT token
 * @param {string} userId - User ID (stored as value for optional validation)
 * @param {number} [ttlSeconds] - TTL in seconds (default 7 days)
 */
async function setUserSession(token, userId, ttlSeconds = DEFAULT_TTL_SECONDS) {
  const redis = getRedisClient();
  if (!redis || !isHealthy) return;
  const key = PREFIX + token;
  try {
    await redis.setex(key, ttlSeconds, String(userId));
  } catch (err) {
    console.error('Redis setUserSession error:', err.message);
  }
}

/**
 * Check if a user session token exists in Redis.
 * @param {string} token - JWT token
 * @returns {Promise<boolean>}
 */
async function getUserSession(token) {
  const redis = getRedisClient();
  // Dev fallback: if Redis is down/unhealthy, allow JWT-only sessions.
  // In production, sessions must exist in Redis to support logout invalidation.
  if (!redis || !isHealthy) {
    return process.env.NODE_ENV !== 'production';
  }
  const key = PREFIX + token;
  try {
    const value = await redis.get(key);
    return value !== null;
  } catch (err) {
    console.error('Redis getUserSession error:', err.message);
    return process.env.NODE_ENV !== 'production';
  }
}

/**
 * Delete user session token from Redis (logout).
 * @param {string} token - JWT token
 */
async function deleteUserSession(token) {
  const redis = getRedisClient();
  if (!redis || !isHealthy) return;
  const key = PREFIX + token;
  try {
    await redis.del(key);
  } catch (err) {
    console.error('Redis deleteUserSession error:', err.message);
  }
}

/**
 * Parse JWT expiresIn (e.g. '7d', '24h') to seconds.
 */
function jwtExpiryToSeconds(expiresIn) {
  if (typeof expiresIn === 'number') return expiresIn;
  const match = (expiresIn || '7d').toString().match(/^(\d+)([dhms])?$/);
  if (!match) return DEFAULT_TTL_SECONDS;
  const n = parseInt(match[1], 10);
  const u = (match[2] || 'd').toLowerCase();
  const map = { d: 86400, h: 3600, m: 60, s: 1 };
  return n * (map[u] || 86400);
}

module.exports = {
  getRedisClient,
  setUserSession,
  getUserSession,
  deleteUserSession,
  jwtExpiryToSeconds,
};
