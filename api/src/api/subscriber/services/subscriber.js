'use strict';

const axios = require('axios');

module.exports = {
  /**
   * Create a webhook in ConvertKit to trigger on subscriber activation.
   */
  async createWebhook() {
    console.log('testing does createWebHook trigger')
    try {
      const webhookData = {
        api_secret: process.env.CONVERTKIT_SECRET_KEY,
        target_url: `${process.env.PUBLIC_API_URL}/subscribers/webhook/activate`,
        event: { name: 'subscriber.subscriber_activate' },
      };

      const response = await axios.post('https://api.convertkit.com/v3/automations/hooks', webhookData);
      console.log('Webhook created:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error creating webhook:', error);
      throw error;
    }
  },

  // Include other existing methods here if there are any
};
