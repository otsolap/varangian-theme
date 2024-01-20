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
    },
    {
      name: 'client',
      script: './client/node_modules/next/dist/bin/next',
      args: 'start',
      watch: ['./client/.next'],
      ignore_watch: ['./client/node_modules', './client/public',],
      cwd: './client',
      env_production: {
        NODE_ENV: 'production'
      },
    },
  ],
};
