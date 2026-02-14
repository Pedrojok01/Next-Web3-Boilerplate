import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import {
  argentWallet,
  coinbaseWallet,
  ledgerWallet,
  metaMaskWallet,
  rabbyWallet,
  rainbowWallet,
  safeWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";
import type { Transport } from "viem";
import { createConfig, http } from "wagmi";
import {
  mainnet,
  sepolia,
  polygon,
  polygonAmoy,
  avalanche,
  avalancheFuji,
  optimism,
  optimismSepolia,
  arbitrum,
  arbitrumSepolia,
  linea,
  lineaSepolia,
  base,
  baseSepolia,
  bsc,
  bscTestnet,
} from "wagmi/chains";

import linea_logo from "../public/img/linea_logo.png";
import lineaTestnet_logo from "../public/img/lineaTestnet_logo.png";

const walletConnectProjectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;

if (!walletConnectProjectId) {
  throw new Error(
    "WalletConnect project ID is not defined. Please check your environment variables.",
  );
}

const connectors = connectorsForWallets(
  [
    {
      groupName: "Recommended",
      wallets: [
        metaMaskWallet,
        rainbowWallet,
        walletConnectWallet,
        ledgerWallet,
        rabbyWallet,
        coinbaseWallet,
        argentWallet,
        safeWallet,
      ],
    },
  ],
  { appName: "Next-Web3-Boilerplate", projectId: walletConnectProjectId },
);

// Fix missing icons
const customLinea = { ...linea, iconUrl: linea_logo.src };
const customLineaSepolia = { ...lineaSepolia, iconUrl: lineaTestnet_logo.src };

const transports: Record<number, Transport> = {
  [mainnet.id]: http(),
  [sepolia.id]: http(),
  [arbitrum.id]: http(),
  [arbitrumSepolia.id]: http(),
  [optimism.id]: http(),
  [optimismSepolia.id]: http(),
  [base.id]: http(),
  [baseSepolia.id]: http(),
  [polygon.id]: http(),
  [polygonAmoy.id]: http(),
  [avalanche.id]: http(),
  [avalancheFuji.id]: http(),
  [linea.id]: http(),
  [lineaSepolia.id]: http(),
  [bsc.id]: http(),
  [bscTestnet.id]: http(),
};

export const wagmiConfig = createConfig({
  chains: [
    mainnet,
    sepolia,
    arbitrum,
    arbitrumSepolia,
    optimism,
    optimismSepolia,
    base,
    baseSepolia,
    polygon,
    polygonAmoy,
    avalanche,
    avalancheFuji,
    customLinea,
    customLineaSepolia,
    bsc,
    bscTestnet,
  ],
  connectors,
  transports,
  ssr: true,
});
