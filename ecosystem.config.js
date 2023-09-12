module.exports = {
  apps: [
    {
      name: 'api-dev',
      script: 'npm',
      args: 'run dev',
      cwd: './app/app/api',
      watch: true,
      env_development: {
        NODE_ENV: 'development'
      },
    },
    {
      name: 'client-dev',
      script: 'npm',
      args: 'run dev',
      cwd: './app/client',
      watch: true,
      env_development: {
        NODE_ENV: 'development'
      },
    },
    {
      name: 'api-prod',
      script: 'npm',
      args: 'run start',
      cwd: './app/api',
      watch: false,
      env_production: {
        NODE_ENV: 'production'
      },
    },
    {
      name: 'client-prod',
      script: 'npm',
      args: 'run start',
      cwd: './app/client',
      watch: false,
      post_deploy: 'npm run clear-cache',
      env_production: {
        NODE_ENV: 'production'
      },
    },
  ],
};
