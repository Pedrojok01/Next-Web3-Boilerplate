import { connectorsForWallets, getDefaultWallets } from "@rainbow-me/rainbowkit";
import { argentWallet, ledgerWallet } from "@rainbow-me/rainbowkit/wallets";
import { configureChains, createConfig, type Chain } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

const alchemyApiKey = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY;
const walletConnectProjectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;

if (!alchemyApiKey || !walletConnectProjectId) {
  throw new Error("Some ENV variables are not defined");
}

export const sepoliaBlast = {
  id: 168587773,
  network: "blast-sepolia",
  name: "Blast Sepolia",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    // alchemy: {
    //   http: ["https://base-mainnet.g.alchemy.com/v2"],
    //   webSocket: ["wss://base-mainnet.g.alchemy.com/v2"],
    // },
    // infura: {
    //   http: ["https://base-mainnet.infura.io/v3"],
    //   webSocket: ["wss://base-mainnet.infura.io/ws/v3"],
    // },
    default: {
      http: ["https://sepolia.blast.io"],
    },
    public: {
      http: ["https://sepolia.blast.io"],
    },
  },
  blockExplorers: {
    default: {
      name: "Blast Sepolia Explorer",
      url: "https://testnet.blastscan.io",
    },
    etherscan: {
      name: "Blast Sepolia Explorer",
      url: "https://testnet.blastscan.io",
    },
  },
} as const satisfies Chain;

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [...(process.env.NODE_ENV === "production" ? [sepoliaBlast] : [sepoliaBlast])],
  [alchemyProvider({ apiKey: alchemyApiKey }), publicProvider()],
);

const { wallets } = getDefaultWallets({
  appName: "Next-Web3-Boilerplate",
  projectId: walletConnectProjectId,
  chains,
});

const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: "Other",
    wallets: [
      argentWallet({ projectId: walletConnectProjectId, chains }),
      ledgerWallet({ projectId: walletConnectProjectId, chains }),
    ],
  },
]);

export const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

export { chains };
