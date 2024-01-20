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
      script: 'npx',
      args: 'next start',
      cwd: './client', 
      watch: ['./client/.next'],
      ignore_watch: ['./client/node_modules', './client/public'],
      env_production: {
        NODE_ENV: 'production'
      },
    },
  ],
};
