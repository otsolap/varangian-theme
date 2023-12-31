const hostnames = [
  'localhost',
  '127.0.0.1',
  'varangianventure.com',
  'api.varangianventure.com'
]

/** @type {import('next').NextConfig} */
const nextConfig = {
images: {
    remotePatterns: hostnames.map(hostname => ({
      hostname  
    }))
  }
}

module.exports = nextConfig;
