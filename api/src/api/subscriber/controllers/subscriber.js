'use strict';

const { createCoreController } = require('@strapi/strapi').factories;
const axios = require('axios');

module.exports = createCoreController('api::subscriber.subscriber', ({ strapi }) =>  ({
  async subscribe(ctx) {
    // Extract the "data" payload from the request
    const requestData = ctx.request.body.data;
    if (!requestData || !requestData.email) {
      return ctx.badRequest('Email is required');
    }

    // Extract email from the "data" payload
    const email = requestData.email;

    // ConvertKit integration
    const convertKitApiKey = process.env.CONVERTKIT_API_KEY;
    const convertKitFormId = process.env.CONVERTKIT_FORM_ID;

    const subscriberData = {
      api_key: convertKitApiKey,
      email: email
      // Add optional fields if needed
    };

    try {
      await axios.post(`https://api.convertkit.com/v3/forms/${convertKitFormId}/subscribe`, subscriberData);
      strapi.log.debug('Subscriber added to ConvertKit:', email);

      // Save subscriber in Strapi
      await strapi.entityService.create('api::subscriber.subscriber', {
        data: {
          email: email
          // Add other fields as per your content type
        }
      });

      ctx.send({ message: 'Subscription processed successfully' });
    } catch (error) {
      strapi.log.error('Error processing subscription:', error.message);
      return ctx.internalServerError('Error processing subscription');
    }
  },

  // Other methods...
}));
