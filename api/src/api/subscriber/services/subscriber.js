'use strict';

/**
 * subscriber service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::subscriber.subscriber', ({ strapi }) =>  ({
  // You can add more custom functions here if needed

  // Custom create function with auto-publish
  async createAndPublish(data) {
    try {
      const entry = await strapi.entityService.create('api::subscriber.subscriber', { data });
      const publishedEntry = await strapi.entityService.update('api::subscriber.subscriber', entry.id, {
        data: { publishedAt: new Date() },
      });
      return publishedEntry;
    } catch (err) {
      throw err;
    }
  },
  // ... include other default or custom service functions as needed
}));


