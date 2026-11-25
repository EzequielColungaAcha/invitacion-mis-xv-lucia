import type { NextConfig } from "next";

const basePath = process.env.PAGES_BASE_PATH || undefined;

const nextConfig: NextConfig = {
  output: "export",
  ...(basePath ? { basePath } : {}),
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
