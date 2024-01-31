module.exports = {
  apps: [
    {
      name: 'api',
      script: 'npm',
      args: 'run start',
      cwd: './api',
      watch: false,
      env_production: {
        NODE_ENV: 'production'
      },
      log_date_format: 'DD-MM-YYYY HH:mm:ss',
    },
    {
      name: 'client',
      script: 'npm',
      args: 'run start',
      cwd: './client',
      watch: ['./client/.next/static', './client/.next/server'],
      ignore_watch: ['./client/node_modules', './client/public', './client/.next/cache'],
      log_date_format: 'DD-MM-YYYY HH:mm:ss'
    },
  ],
};
