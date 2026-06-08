import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/neurological",
        destination: "/#conditions",
        permanent: true,
      },
      {
        source: "/orthopedic",
        destination: "/#conditions",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
