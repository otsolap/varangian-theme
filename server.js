const { execSync } = require('child_process');

// Run necessary commands defined in package.json scripts
try {
  execSync('npm run setup', { stdio: 'inherit' });
  execSync('npm run build', { stdio: 'inherit' });
  execSync('npm run start', { stdio: 'inherit' });
} catch (error) {
  console.error('Failed to run necessary commands:', error);
  process.exit(1);
}
