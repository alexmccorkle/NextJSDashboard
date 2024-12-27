import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* CONFIG OPTIONS */
  async redirects() {
    return [
      {
        source: '/',
        destination: '/dashboard',
        permanent: true,
      }
    ]
  }
};

export default nextConfig;
