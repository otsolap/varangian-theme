'use strict';

const { createCoreController } = require('@strapi/strapi').factories;
const axios = require('axios');

module.exports = createCoreController('api::subscribe-form.subscribe-form', ({ strapi }) => ({
    async create(ctx) {
        const requestData = ctx.request.body.data;
        if (!requestData || !requestData.email || !requestData.subscribeFormId) {
            return ctx.badRequest('Email and SubscribeFormId are required');
        }

        const { email, subscribeFormId } = requestData;

        // Fetch the corresponding subscribe-form entry to get the formID
        const subscribeForm = await strapi.entityService.findOne('api::subscribe-form.subscribe-form', subscribeFormId, {
            fields: ['formID']
        });

        if (!subscribeForm || !subscribeForm.formID) {
            return ctx.notFound('Subscribe form not found or formID missing');
        }

        const convertKitApiKey = process.env.CONVERTKIT_API_KEY;
        const subscriberData = {
            api_key: convertKitApiKey,
            email: email
            // Add optional fields if needed
        };

        try {
            await axios.post(`https://api.convertkit.com/v3/forms/${subscribeForm.formID}/subscribe`, subscriberData);
            strapi.log.debug('Subscriber added to ConvertKit:', email);

            // Save subscriber in Strapi (if needed)
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
