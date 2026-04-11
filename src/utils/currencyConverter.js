// Currency Converter Utility
// Fetches real-time USD to INR exchange rate

const FALLBACK_RATE = 92.74; // Fallback rate if API fails (1 USD = 92.74 INR)
const CACHE_DURATION = 3600000; // 1 hour in milliseconds

let cachedRate = null;
let cacheTimestamp = null;

/**
 * Fetches the current USD to INR exchange rate
 * Uses exchangerate-api.com (free tier allows 1500 requests/month)
 * @returns {Promise<number>} The current exchange rate
 */
export async function getUSDtoINRRate() {
  // Check if we have a valid cached rate
  if (cachedRate && cacheTimestamp && (Date.now() - cacheTimestamp < CACHE_DURATION)) {
    console.log('Using cached exchange rate:', cachedRate);
    return cachedRate;
  }

  try {
    // Using exchangerate-api.com free API
    const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
    
    if (!response.ok) {
      throw new Error('Failed to fetch exchange rate');
    }

    const data = await response.json();
    const rate = data.rates.INR;

    if (rate && typeof rate === 'number' && rate > 0) {
      cachedRate = rate;
      cacheTimestamp = Date.now();
      console.log('Fetched new exchange rate:', rate);
      return rate;
    } else {
      throw new Error('Invalid rate received');
    }
  } catch (error) {
    console.error('Error fetching exchange rate:', error);
    console.log('Using fallback rate:', FALLBACK_RATE);
    return FALLBACK_RATE;
  }
}

/**
 * Converts USD amount to INR
 * @param {number} usdAmount - Amount in USD
 * @param {number} rate - Exchange rate (optional, will fetch if not provided)
 * @returns {Promise<number>} Amount in INR
 */
export async function convertUSDtoINR(usdAmount, rate = null) {
  const exchangeRate = rate || await getUSDtoINRRate();
  return usdAmount * exchangeRate;
}

/**
 * Converts USD amount to INR paise (for Razorpay)
 * @param {number} usdAmount - Amount in USD
 * @param {number} rate - Exchange rate (optional, will fetch if not provided)
 * @returns {Promise<number>} Amount in paise (1 INR = 100 paise)
 */
export async function convertUSDtoPaise(usdAmount, rate = null) {
  const inrAmount = await convertUSDtoINR(usdAmount, rate);
  return Math.round(inrAmount * 100);
}

/**
 * Get cached rate without making API call
 * @returns {number|null} Cached rate or null
 */
export function getCachedRate() {
  if (cachedRate && cacheTimestamp && (Date.now() - cacheTimestamp < CACHE_DURATION)) {
    return cachedRate;
  }
  return null;
}

/**
 * Clear the cached rate (useful for testing)
 */
export function clearCache() {
  cachedRate = null;
  cacheTimestamp = null;
}
