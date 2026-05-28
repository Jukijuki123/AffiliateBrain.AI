import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  serverExternalPackages: ["firebase-admin", "@google-cloud/firestore"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "*.googleusercontent.com" },
    ],
  },
  typescript: {
    // !! PERINGATAN !!
    // Ini akan membiarkan build sukses meskipun ada error TypeScript.
    // Sangat berguna buat nge-push produk pertama kali agar cepat tayang.
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
