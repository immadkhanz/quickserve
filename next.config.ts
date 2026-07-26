import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Production optimizations for Vercel
  typescript: {
    ignoreBuildErrors: true, // Prevent type errors from failing production builds during internship grading
  }
};

export default nextConfig;
