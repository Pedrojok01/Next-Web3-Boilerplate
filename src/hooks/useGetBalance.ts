import { useAccount, useReadContract } from "wagmi";

import { SMART_CONTRACT_ADDRESS } from "@/utils/constants";

import MTT3 from "../contracts/ERC1919.json";

export const useGetBalance = () => {
  const { address } = useAccount();
  // console.log(address);
  const { data: balance, refetch } = useReadContract({
    abi: MTT3,
    address: SMART_CONTRACT_ADDRESS,
    functionName: "balanceOf",
    args: [address],
  });
  return { balance, refetch };
};
