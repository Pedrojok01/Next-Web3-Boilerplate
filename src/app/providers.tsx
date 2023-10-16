"use client";
import { type ReactNode, useState, useEffect } from "react";

import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiConfig } from "wagmi";

import { chains, config } from "@/wagmi";

export function Providers({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  return (
    <WagmiConfig config={config}>
      <RainbowKitProvider chains={chains}>{mounted && children}</RainbowKitProvider>
    </WagmiConfig>
  );
}
