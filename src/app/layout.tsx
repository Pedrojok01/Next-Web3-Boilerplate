import type { ReactNode } from "react";

import "@/styles/globals.css";
import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";

import "@rainbow-me/rainbowkit/styles.css";
import { Providers } from "./providers";

const open_sans = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next-Web3-Boilerplate",
  applicationName: "Next Web3 Boilerplate",
  description: "Next.js Web3 boilerplate built on Wagmi, Viem, and Rainbow",
  authors: {
    name: "Pedrojok01",
    url: "https://github.com/Pedrojok01/Next-Web3-Boilerplate",
  },
  icons: "favicon.ico",
  manifest: "site.webmanifest",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={open_sans.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
