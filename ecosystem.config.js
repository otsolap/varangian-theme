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
      script: 'npm',
      args: 'run start',
      cwd: './client', 
      watch: ['./client/.next/static', './client/.next/server'],
      ignore_watch: ['./client/node_modules', './client/public', './client/.next/cache'],
      env_production: {
        HOST: '127.0.0.1',
        PORT: 3000,
        NODE_ENV: 'production'
      },
    },
  ],
};
