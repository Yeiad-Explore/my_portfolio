import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(glb|gltf)$/,
      type: 'asset/resource',
    });
    return config;
  },
  turbopack: {
    // Turbopack configuration for .glb files
    resolveAlias: {},
  },
};

export default nextConfig;
