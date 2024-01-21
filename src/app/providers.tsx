"use client";
import { type ReactNode, useState, useEffect } from "react";

import { CacheProvider } from "@chakra-ui/next-js";
import { extendTheme, ChakraProvider, Flex, Box } from "@chakra-ui/react";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiConfig } from "wagmi";

import { Footer, Header } from "@/components";
import { useWindowSize } from "@/hooks";
import { chains, config } from "@/wagmi";

export function Providers({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const { isTablet } = useWindowSize();

  useEffect(() => setMounted(true), []);

  const theme = extendTheme({ initialColorMode: "dark", useSystemColorMode: false });

  const appInfo = {
    appName: "Next-Web3-Boilerplate",
  };

  return (
    <WagmiConfig config={config}>
      <CacheProvider>
        <ChakraProvider resetCSS theme={theme}>
          <RainbowKitProvider coolMode chains={chains} appInfo={appInfo}>
            {mounted && (
              <Flex flexDirection="column" minHeight="100vh">
                <Header />

                <Box as="main" flex={1} p={4}>
                  {children}
                </Box>

                {isTablet && <Footer />}
              </Flex>
            )}
          </RainbowKitProvider>
        </ChakraProvider>
      </CacheProvider>
    </WagmiConfig>
  );
}
