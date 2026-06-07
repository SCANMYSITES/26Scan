/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    turbopack: false,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.md$/,
      type: "asset/source",
    });
    return config;
  },
};

module.exports = nextConfig;