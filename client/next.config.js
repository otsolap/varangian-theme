/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    loader: "default",
    domains: ["localhost", "127.0.0.1", 'varangianventure.com', 'api.varangianventure.com'],
  },
};

module.exports = nextConfig;