const axios = require('axios');

module.exports = {
  // Schedule: Once a day
  '0 1 * * *': async () => {
    try {
      console.log('Active subscriber data fetched from ConvertKit');
      // Fetch the form ID
      const formResponse = await axios.get(`${process.env.PUBLIC_API_URL}/api/subscribe-form`);
      const formID = parseInt(formResponse.data.data.attributes.formID);

      if (!formID) {
        throw new Error('Form ID not found');
      }

      // Fetch subscribers from ConvertKit
      const subscribersResponse = await axios.get(`https://api.convertkit.com/v3/forms/${formID}/subscriptions`, {
        params: {
          api_secret: process.env.CONVERTKIT_SECRET_KEY,
          subscriber_state: 'active'
        }
      });

      // Process each subscription
      for (const subscription of subscribersResponse.data.subscriptions) {
        const email = subscription.subscriber.email_address;
        const convertKitID = subscription.subscriber.id;

        // Check if the subscriber already exists in Strapi
        const existingSubscriber = await strapi.entityService.findMany('api::subscriber.subscriber', {
          filters: { convertkitID: convertKitID }
        });

        // If not, create a new subscriber
        if (existingSubscriber.length === 0) {
          await strapi.service('api::subscriber.subscriber').createAndPublish({
            convertkitID: convertKitID,
            email: email,
            // Add other relevant fields
          });
        } else {
          // Update existing subscriber if needed (for instance, if email changes)
          await strapi.entityService.update('api::subscriber.subscriber', existingSubscriber[0].id, {
            data: {
              email: email,
              // Update other relevant fields if necessary
            }
          });
        }
      }
      console.log('Subscribers updated from ConvertKit');
    } catch (error) {
      console.error('Error updating subscribers from ConvertKit:', error.message);
    }
  },
};
