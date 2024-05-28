"use client";

import { createContext, useState, useContext } from "react";

import { useAccount, useReadContract } from "wagmi";

import MTT3 from "../contracts/ERC1919.json";

const AppContext = createContext("0");

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const [balance, setBalance] = useState("0");

  const { address } = useAccount();
  const { data: ERC1919balance } = useReadContract({
    abi: MTT3,
    address: "0x28915D1DF4d6d5dF90F0B4B3d626600b106953Bf",
    functionName: "balanceOf",
    args: [address],
  });
  console.log(ERC1919balance);
  const displayBalance = balance ? Number(balance) / 1e18 : 0;
  setBalance(displayBalance.toString());
  return <AppContext.Provider value={balance}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  return useContext(AppContext);
}
