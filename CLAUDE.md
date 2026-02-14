# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Next.js 16 Web3 boilerplate using the App Router, React 19, Wagmi v2, Viem, RainbowKit, and Chakra UI v3. Single-page dApp supporting 16 EVM chains (8 mainnets + 8 testnets) and 8 wallet connectors.

## Commands

- **Dev server**: `yarn dev` (Turbopack is the default in Next.js 16)
- **Build**: `yarn build`
- **Start production**: `yarn start`
- **Lint (auto-fix)**: `yarn lint`
- **Format**: `yarn prettier`
- **Docker**: `docker build -t next-web3-boilerplate -f Dockerfile . && docker run -p 3000:3000 next-web3-boilerplate`

No test framework is configured.

The pre-commit hook runs `yarn prettier`, `yarn lint`, then `git add .` automatically.

## Architecture

### Routing & Providers

Next.js App Router with a single route (`/`). Provider chain in `src/app/providers.tsx`:
`ChakraProvider` → `ThemeProvider` → `WagmiProvider` → `QueryClientProvider` → `RainbowKitProvider`. A `useSyncExternalStore` guard prevents SSR hydration mismatches.

### Component Organization

```
src/components/
├── Header/         — Logo, RainbowKit ConnectButton, DarkModeButton
├── MainPane/       — Main content; nested feature components in MainPane/components/
│   ├── Status, Address, Chain, Balance, BlockNumber  — Display components
│   ├── SignMessage      — Message signing with signature recovery
│   └── TransferNative   — Native token transfer with ENS resolution
├── Footer/
└── elements/       — Reusable UI: AddressInput, DarkModeButton, InfoText, Toaster, Jazzicons
```

Components use barrel exports (`index.ts` in each folder). All components are client components (`"use client"`).

### Web3 Stack

- **Wagmi config**: `src/wagmi.ts` — chain definitions, wallet connectors, transports. Requires `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` env var.
- **Chains**: Ethereum, Polygon, Avalanche, Optimism, Arbitrum, Base, Linea, BSC (+ their Sepolia/Amoy/Fuji testnets)
- **Wallets**: MetaMask, Rainbow, WalletConnect, Ledger, Rabby, Coinbase, Argent, Safe

### Custom Hooks (`src/hooks/`)

- `useAddressInput` — ENS resolution via `useEnsAddress` + address validation with 3s debounce
- `useSignMessageHook` — Message signing + address recovery via `recoverMessageAddress`
- `useNotify` — Chakra UI toast wrapper (`notifySuccess`/`notifyError`), memoized with `useCallback`
- `useColorMode` — Dark mode via next-themes (`useColorModeValue<T>(light, dark)`)
- `useWindowSize` — Responsive breakpoints with 150ms debounce: `isMobile` (≤549), `isTablet` (≤768), `isSmallScreen` (≤1050)
- `useDebounce` — Generic debounce (default 500ms)

### Styling

Chakra UI v3 with `defaultSystem` + CSS Modules (`*.module.css`) + global CSS variables in `src/styles/globals.css`. Custom classes: `.custom-button`, `.custom-input`, `.text-shadow`. Dark mode default, controlled via next-themes (`enableSystem={false}`).

## Code Conventions

- **Path alias**: `@/*` → `./src/*`
- **Quotes**: Double quotes (Prettier `singleQuote: false`)
- **Print width**: 100 characters
- **Semicolons**: Always
- **Trailing commas**: All
- **Import order** (enforced by ESLint): React first, then external, then internal — alphabetized with newlines between groups
- **ESLint**: v9 flat config (`eslint.config.mjs`), extends `eslint-config-next` (native flat config) + TypeScript recommended + Prettier + CSS plugins.
- **Lint command**: `eslint --fix .` (Next.js 16 removed `next lint`)

## Environment Setup

Copy `.env.example` to `.env` and set `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` (from WalletConnect Cloud). The app will throw at startup if this is missing.
