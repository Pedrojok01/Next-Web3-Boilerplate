import type { NextConfig } from "next";

// `@coinbase/cdp-sdk` (pulled in by the Base Account connector via RainbowKit)
// dynamically imports these optional `@x402/*` packages without declaring them
// as dependencies. Nothing in this dApp reaches that code path, so they are
// aliased to an empty module to keep the bundler from failing to resolve them.
const x402Stubs = [
  "@x402/core/client",
  "@x402/evm",
  "@x402/evm/exact/client",
  "@x402/evm/upto/client",
  "@x402/svm/exact/client",
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: { optimizePackageImports: ["@chakra-ui/react"] },
  serverExternalPackages: ["pino-pretty", "lokijs", "encoding", "react-jazzicon"],
  turbopack: {
    resolveAlias: Object.fromEntries(x402Stubs.map((id) => [id, "./src/stubs/empty-module.cjs"])),
  },
  // `output: "standalone"` exists for the Docker image only. Vercel's build
  // adapter does its own output file tracing, and combining the two breaks its
  // onBuildComplete step with a missing `.next/next-server.js.nft.json`.
  output: process.env.VERCEL ? undefined : "standalone",
};

export default nextConfig;
