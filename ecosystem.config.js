module.exports = {
  apps: [
    {
      name: 'api-dev',
      script: 'npm',
      args: 'run dev',
      cwd: './api',
      watch: true,
      env_development: {
        NODE_ENV: 'development'
      },
    },
    {
      name: 'client-dev',
      script: 'npm',
      args: 'run dev',
      cwd: './client',
      watch: true,
      env_development: {
        NODE_ENV: 'development'
      },
    },
    {
      name: 'api-prod',
      script: 'npm',
      args: 'run start',
      cwd: './api',
      watch: false,
      env_production: {
        NODE_ENV: 'production'
      },
    },
    {
      name: 'client-prod',
      script: './client/node_modules/next/dist/bin/next',
      args: 'start',
      watch: ['./client/.next'],
      cwd: './client',
      env_production: {
        NODE_ENV: 'production'
      },
    },
  ],
};
