/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    CONTRACT_ID: "p2p.onihani.testnet",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.aceternity.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "svgl.app",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "s2.coinmarketcap.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "asset-metadata-service-production.s3.amazonaws.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "assets.dryicons.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
