import { useAccount, useReadContract } from "wagmi";

import MTT3 from "../contracts/ERC1919.json";

export const useGetBalance = () => {
  const { address } = useAccount();
  console.log(address);
  const { data: balance, refetch } = useReadContract({
    abi: MTT3,
    address: "0x28915D1DF4d6d5dF90F0B4B3d626600b106953Bf",
    functionName: "balanceOf",
    args: [address],
  });
  return { balance, refetch };
};
