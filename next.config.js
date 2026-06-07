/** @type {import('next').NextConfig} */
export default function AdminPage() {
  return <div>Admin</div>;
}

const nextConfig = {
  turbopack: {},
  webpack: (config) => {
    config.module.rules.push({
      test: /\.md$/,
      type: "asset/source",
    });
    return config;
  },
};

module.exports = nextConfig;