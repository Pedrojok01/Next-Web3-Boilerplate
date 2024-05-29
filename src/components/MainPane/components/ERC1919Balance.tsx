import { useContext, useEffect, type FC } from "react";

import { useAccount, useReadContract } from "wagmi";

import { InfoText } from "@/components";

import MTT3 from "../../../contracts/ERC1919.json";
import { Context } from "../web3/context";

const ERC1919Balance: FC = (): JSX.Element => {
  const { b, setB } = useContext(Context);
  const { address } = useAccount();
  const { data: balance } = useReadContract({
    abi: MTT3,
    address: "0x28915D1DF4d6d5dF90F0B4B3d626600b106953Bf",
    functionName: "balanceOf",
    args: [address],
  });
  console.log(balance);
  const displayBalance = balance ? Number(balance) / 1e18 : 0;
  setB(displayBalance.toString());
  useEffect(() => {
    alert("State changed!" + b);
  }),
    [b];

  return <InfoText label="MTT3 Balance" value={displayBalance.toString()} />;
};

export default ERC1919Balance;
