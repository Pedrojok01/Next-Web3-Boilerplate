"use client";
import { type ReactNode, useState, useEffect } from "react";

import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { WagmiProvider } from "wagmi";

import { Toaster } from "@/components/Toaster";
import { wagmiConfig } from "@/wagmi";
export interface ProviderProps {
  children: ReactNode;
  value?: typeof defaultSystem;
}

export function Providers({ children, value = defaultSystem }: Readonly<ProviderProps>) {
  const [queryClient] = useState(() => new QueryClient());
  const [mounted, setMounted] = useState(false);

  const appInfo = { appName: "Next-Web3-Boilerplate" };

  useEffect(() => setMounted(true), []);

  // Prevent hydration issues by only rendering once mounted
  if (!mounted) {
    return null;
  }

  return (
    <ChakraProvider value={value}>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
        <WagmiProvider config={wagmiConfig}>
          <QueryClientProvider client={queryClient}>
            <RainbowKitProvider appInfo={appInfo}>{children}</RainbowKitProvider>
            <Toaster />
          </QueryClientProvider>
        </WagmiProvider>
      </ThemeProvider>
    </ChakraProvider>
  );
}
