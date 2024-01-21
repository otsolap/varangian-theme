module.exports = {
  apps: [
    {
      name: 'api',
      script: 'npm',
      args: 'run start',
      cwd: './api',
      watch: false,
    },
    {
      name: 'client',
      script: 'npm',
      args: 'run start',
      cwd: './client', 
      watch: ['./client/.next/static', './client/.next/server'],
      ignore_watch: ['./client/node_modules', './client/public', './client/.next/cache'],
    },
  ],
};
