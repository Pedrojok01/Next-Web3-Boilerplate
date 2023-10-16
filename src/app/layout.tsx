import { type ReactNode } from "react";

import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "@rainbow-me/rainbowkit/styles.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next-Web3-Boilerplate",
  description: "Next.js Web3 boilerplate built on Wagmi, Viem, and Rainbow",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
