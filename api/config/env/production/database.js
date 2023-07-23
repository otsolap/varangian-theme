const prodEnv = require('../../../env.production');

module.exports = ({ env }) => ({
  connection: {
    client: 'mysql',
    connection: {
      host: prodEnv('DATABASE_HOST', '127.0.0.1'),
      port: prodEnv.int('DATABASE_PORT', 3306),
      database: prodEnv('DATABASE_NAME', 'strapi'),
      user: prodEnv('DATABASE_USERNAME', 'strapi'),
      password: prodEnv('DATABASE_PASSWORD', 'strapi'),
      ssl: {
        ca: prodEnv('DATABASE_CA'),
      },
    },
    debug: false,
  },
});
