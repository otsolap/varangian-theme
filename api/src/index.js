'use strict';

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap({ strapi }) {
    // Check if the environment is production
    if (process.env.NODE_ENV === 'production') {
      try {
        // Attempt to directly require the subscriber service
        const subscriberService = require('./api/subscriber/services/subscriber');

        // Now, use the directly required service
        if (subscriberService && subscriberService.createWebhook) {
          subscriberService.createWebhook().then(() => {
            strapi.log.info('Webhook initialized');
          }).catch(err => {
            strapi.log.error('Error initializing webhook:', err);
          });
        } else {
          strapi.log.error('Subscriber service or createWebhook method not found');
        }
      } catch (e) {
        strapi.log.error('Error requiring subscriber service:', e.message);
      }
    } else {
      // Setup for development environment
      // You can add any development-specific logic here
      strapi.log.info('Development environment detected, skipping convertkit webhook setup');
    }
  },
};
