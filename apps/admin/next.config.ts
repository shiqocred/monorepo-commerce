import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        hostname: "localhost",
        protocol: "http",
        port: "3002",
      },
    ],
  },
};

export default nextConfig;
