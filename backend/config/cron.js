const cron = require('node-cron');
const notificationService = require('../services/notificationService');

/**
 * Setup cron jobs for scheduled notifications
 * Runs every minute to check for pending notifications
 */
const setupCronJobs = () => {
  // Run every minute: check for pending scheduled notifications and dispatch them
  cron.schedule('* * * * *', async () => {
    try {
      const count = await notificationService.dispatchScheduledNotifications();
      
      if (count > 0) {
        console.log(`[Cron] Processed ${count} scheduled notifications at ${new Date().toISOString()}`);
      }
    } catch (error) {
      console.error('[Cron] Error processing scheduled notifications:', error);
    }
  });

  console.log('[Cron] Notification scheduler initialized - running every minute');
};

module.exports = setupCronJobs;
