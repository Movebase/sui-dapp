/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  async redirects() {
    return [
      {
        source: "/",
        destination: "/store",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "192.168.18.60",
        port: "3001",
        pathname: "/api/storage/dapps/**",
      },
    ],
  },
};

export default nextConfig;
