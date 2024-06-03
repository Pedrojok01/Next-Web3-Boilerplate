import { useReadContract } from "wagmi";
import { useBalance } from "wagmi";

import { SMART_CONTRACT_ADDRESS } from "@/utils/constants";

import MTT3 from "../contracts/ERC1919.json";
export const useContractStatus = () => {
  const { data: currentSupply, refetch: r1 } = useReadContract({
    abi: MTT3,
    address: SMART_CONTRACT_ADDRESS,
    functionName: "currentSupply",
    args: [],
  });

  const { data: currentPrice, refetch: r2 } = useReadContract({
    abi: MTT3,
    address: SMART_CONTRACT_ADDRESS,
    functionName: "currentPrice",
    args: [],
  });

  const { data: currentLevel, refetch: r3 } = useReadContract({
    abi: MTT3,
    address: SMART_CONTRACT_ADDRESS,
    functionName: "currentLevel",
    args: [],
  });

  const { data: contractBalance, refetch: r4 } = useBalance({ address: SMART_CONTRACT_ADDRESS });

  const refetchContract = () => {
    r1();
    r2();
    r3();
    r4();
  };

  return { currentSupply, currentPrice, currentLevel, contractBalance, refetchContract };
};
