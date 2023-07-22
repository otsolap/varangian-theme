const { execSync } = require('child_process');

try {
  // Install pm2
  execSync('npm install pm2');

  // Start the application with pm2
  execSync('npx pm2 start ecosystem.config.js --env production');
} catch (error) {
  console.error(error);
}
