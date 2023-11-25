'use strict';

/**
 * subscriber controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const axios = require('axios'); // Ensure axios is installed

module.exports = createCoreController('api::subscriber.subscriber', ({ strapi }) => ({
  async create(ctx) {
    try {
      // Fetch the formID from your subscribe-form endpoint
      const formResponse = await axios.get(`${process.env.PUBLIC_API_URL}/api/subscribe-form`);
      // Convert formID to a number for comparison
      const formID = parseInt(formResponse.data.data.attributes.formID);

      // Extract the request data
      const requestData = ctx.request.body.data;

      // Convert requestData.subscribeFormId to a number for comparison
      const requestFormId = parseInt(requestData.subscribeFormId);

      // Check for required fields (assuming email is required)
      if (!requestData || !requestData.email || requestFormId !== formID) {
        return ctx.badRequest('Email and correct formID are required');
      }

      // ConvertKit API request setup
      const convertKitApiUrl = `https://api.convertkit.com/v3/forms/${formID}/subscribe`;

      // Prepare data for ConvertKit
      const convertKitData = {
        email: requestData.email,
        api_key: process.env.CONVERTKIT_API_KEY,
        // Add any other fields required by ConvertKit
      };

      // Send the subscriber data to ConvertKit
      await axios.post(convertKitApiUrl, convertKitData);

      // Proceed with the creation logic in Strapi
      const entity = await strapi.entityService.create('api::subscriber.subscriber', {
        data: {
          email: requestData.email,
          // Add any other fields you need to store for a subscriber
        },
      });

      // Return the created entity
      return ctx.created(entity);

    } catch (error) {
      // Handle errors
      console.error('Error in subscriber creation:', error);
      return ctx.internalServerError('Error processing your request');
    }
  }
}));
