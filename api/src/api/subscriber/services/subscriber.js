'use strict';

/**
 * subscriber service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::subscriber.subscriber', ({ strapi }) => ({
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
}));
