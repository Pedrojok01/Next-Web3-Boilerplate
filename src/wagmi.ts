import { getDefaultWallets } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig } from "wagmi";
import {
  mainnet,
  sepolia,
  polygon,
  polygonMumbai,
  optimism,
  optimismGoerli,
  arbitrum,
  arbitrumGoerli,
  zkSync,
  zkSyncTestnet,
  base,
  baseGoerli,
} from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

const alchemyApiKey = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY;
const walletConnectProjectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;

if (!alchemyApiKey || !walletConnectProjectId) {
  throw new Error("Some ENV variables are not defined");
}

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    ...(process.env.NODE_ENV === "production"
      ? [mainnet, optimism, polygon, arbitrum, zkSync, base]
      : [sepolia, optimismGoerli, polygonMumbai, arbitrumGoerli, zkSyncTestnet, baseGoerli]),
  ],
  [alchemyProvider({ apiKey: alchemyApiKey }), publicProvider()],
);

const { connectors } = getDefaultWallets({
  appName: "Next-Web3-Boilerplate",
  chains,
  projectId: walletConnectProjectId,
});

export const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

export { chains };
