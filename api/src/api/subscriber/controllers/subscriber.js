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
      const formID = formResponse.data.data.attributes.formID;

      // Extract the request data
      const requestData = ctx.request.body.data;

      // Check for required fields (assuming email is required)
      if (!requestData || !requestData.email || requestData.subscribeFormId !== formID) {
        return ctx.badRequest('Email and correct formID are required');
      }

      // Prepare data for ConvertKit
      const convertKitData = {
        email: requestData.email,
        api_key: process.env.CONVERTKIT_API_KEY,
        // Add any other fields required by ConvertKit
      };

      // Send data to ConvertKit
      await axios.post('https://api.convertkit.com/v3/subscribers', convertKitData);

      // Respond with a success message (or you can customize this response)
      return ctx.response.send('Subscription successful');

    } catch (error) {
      strapi.log.error('Subscription error:', error);
      return ctx.badRequest('Subscription failed');
    }
  },

  /**
   * Webhook handler for subscriber activation.
   */
  async webhookActivate(ctx) {
    try {
      const webhookData = ctx.request.body;

      // Validate the webhook data
      if (!webhookData || !webhookData.email) {
        return ctx.badRequest('Invalid webhook data');
      }

      // Prepare the data for saving to Strapi
      const subscriberData = {
        data: {
          email: webhookData.email,
          // You can add additional fields here if needed
        },
      };

      // Save the subscriber to the database
      const savedSubscriber = await strapi.entityService.create('api::subscriber.subscriber', subscriberData);

      // Optionally publish the subscriber if your business logic requires it
      // await strapi.entityService.publish('api::subscriber.subscriber', savedSubscriber.id);

      // Send a response back to the webhook sender
      return ctx.response.send({ message: 'Subscriber saved successfully', subscriber: savedSubscriber });

    } catch (error) {
      strapi.log.error('Webhook handling error:', error);
      return ctx.badRequest('Error handling webhook');
    }
  },
}));
