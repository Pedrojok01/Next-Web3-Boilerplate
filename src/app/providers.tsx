"use client";
import { type ReactNode, useState, useEffect } from "react";

import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiConfig } from "wagmi";

import { chains, config } from "@/wagmi";

import { CacheProvider } from "@chakra-ui/next-js";
import { extendTheme, ChakraProvider } from "@chakra-ui/react";

export function Providers({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const themeConfig = {
    initialColorMode: "dark",
    useSystemColorMode: false,
  };
  const theme = extendTheme(themeConfig);

  return (
    <WagmiConfig config={config}>
      <CacheProvider>
        <ChakraProvider resetCSS theme={theme}>
          <RainbowKitProvider chains={chains}>{mounted && children}</RainbowKitProvider>
        </ChakraProvider>
      </CacheProvider>
    </WagmiConfig>
  );
}
