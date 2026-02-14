import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: { optimizePackageImports: ["@chakra-ui/react"] },
  serverExternalPackages: ["pino-pretty", "lokijs", "encoding", "react-jazzicon"],
  output: "standalone",
};

export default nextConfig;
