'use strict';

module.exports = {
  routes: [
    // ... existing routes ...
    {
      method: 'POST',
      path: '/subscribers/webhook/activate',
      handler: 'subscriber.webhookActivate',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    // ... any additional routes ...
  ],
};
