'use strict';

module.exports = {
  async triggerWebhookCreation(ctx) {
    try {
      const response = await strapi.services.subscribers.createWebhook();
      ctx.send(response);
    } catch (error) {
      ctx.throw(500, error.message);
    }
  },

  // Other route handlers...
};
