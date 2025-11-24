import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com", // Replace with the actual hostname of your external image source
        port: "",
        pathname: "/a/**", // Optional: restrict to specific paths
      },
    ],
  },
};

export default nextConfig;
