'use strict';

const axios = require('axios'); // Ensure axios is installed and required

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
     * Bootstrap function.
     */
  async bootstrap({ strapi }) {
    // Only run in production environment
    if (process.env.NODE_ENV === 'production') {
      try {
        // Fetch the ConvertKit form ID from your API
        const formResponse = await axios.get(`${process.env.PUBLIC_API_URL}/api/subscribe-form`);
        const formID = formResponse.data?.data?.attributes?.formID;

        // Check if the form ID exists
        if (formID) {
          // Setup the ConvertKit webhook
          await setupConvertKitWebhook(formID, strapi);
          strapi.log.info('ConvertKit Webhook setup completed.');
        } else {
          strapi.log.warn('No ConvertKit form ID found. Skipping webhook setup.');
        }
      } catch (error) {
        strapi.log.error('Error during ConvertKit setup:', error.message);
      }
    } else {
      strapi.log.info('Non-production environment detected, skipping webhook setup.');
    }
  },
};

/**
 * Setup the ConvertKit webhook.
 * @param {string} formID - The ConvertKit form ID.
 * @param {object} strapi - Strapi instance.
 */
async function setupConvertKitWebhook(formID, strapi) {
  try {
    // Define the webhook URL and payload (modify according to your needs)
    const webhookUrl = `https://api.convertkit.com/v3/forms/${formID}/webhooks`;
    const payload = {
      webhook: {
        api_secret: process.env.CONVERTKIT_SECRET_KEY,
        url:  `${process.env.PUBLIC_API_URL}/subscribers/webhook/activate`, // Replace with your actual webhook URL
        events: ['subscribe'] // Define the events you want to listen to
      }
    };

    // Send a request to ConvertKit to set up the webhook
    const response = await axios.post(webhookUrl, payload, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.CONVERTKIT_API_KEY}` // Ensure your ConvertKit API key is set in the environment
      }
    });

    // Log the response from ConvertKit for confirmation
    strapi.log.info('ConvertKit webhook response:', response.data);
  } catch (error) {
    strapi.log.error('Error setting up ConvertKit webhook:', error.message);
  }
}
