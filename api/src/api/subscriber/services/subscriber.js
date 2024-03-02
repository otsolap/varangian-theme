'use strict';

/**
 * subscriber router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::subscriber.subscriber', [
  {
    method: 'POST',
    path: '/subscribers/webhook/activate',
    handler: 'subscriber.webhookActivate',
    config: {
      policies: [],
      middlewares: [],
    },
  },
]);
