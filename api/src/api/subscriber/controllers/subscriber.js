'use strict';

const axios = require('axios');
const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::subscriber.subscriber', ({ strapi }) => ({
  /**
   * Create a subscriber entry.
   */
  async create(ctx) {
    try {
      // Fetch the form configuration
      const formResponse = await axios.get(`${process.env.PUBLIC_API_URL}/api/subscribe-form`);
      const formID = parseInt(formResponse.data.data.attributes.formID);

      // Extract the request data
      const requestData = ctx.request.body.data;

      // Check for required fields and correct formID
      if (!requestData || !requestData.email || parseInt(requestData.subscribeFormId) !== formID) {
        return ctx.badRequest('Email and correct formID are required');
      }

      // Prepare data for ConvertKit
      const convertKitData = {
        email: requestData.email,
        api_key: process.env.CONVERTKIT_API_KEY,
        // Add any other fields required by ConvertKit
      };

      // Send data to ConvertKit
      await axios.post(`https://api.convertkit.com/v3/forms/${formID}/subscribe`, convertKitData);

      // Respond with a success message (or you can customize this response)
      return ctx.response.send('Subscription successful');

    } catch (error) {
      strapi.log.error('Subscription error:', error.message);
      return ctx.badRequest('Subscription failed');
    }
  },

  /**
   * Webhook handler for subscriber activation.
   */
  async webhookActivate(ctx) {
    try {
      const response = await strapi.service('api::subscriber.subscriber').createAndPublish(ctx.request.body);
      ctx.body = response;
    } catch (err) {
      ctx.body = err;
      ctx.status = 500;
    }
  },
}));

