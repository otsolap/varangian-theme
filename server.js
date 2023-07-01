const { execSync } = require('child_process');

try {
  // Run necessary commands defined in package.json scripts
  execSync('npm run setup', { stdio: 'inherit' });
  execSync('npm run build', { stdio: 'inherit' });
  execSync('npm run production', { stdio: 'inherit' });
  console.log('All steps completed successfully.');
} catch (error) {
  console.error('Failed to run necessary commands:', error);
  process.exit(1);
}
