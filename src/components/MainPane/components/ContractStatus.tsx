import type { FC } from "react";

import { HStack } from "@chakra-ui/react";
import { useReadContract } from "wagmi";

import { InfoText } from "@/components";

import MTT3 from "../../../contracts/ERC1919.json";

const ContractStatus: FC = (): JSX.Element => {
  const { data: currentSupply } = useReadContract({
    abi: MTT3,
    address: "0x28915D1DF4d6d5dF90F0B4B3d626600b106953Bf",
    functionName: "currentSupply",
    args: [],
  });

  const { data: currentPrice } = useReadContract({
    abi: MTT3,
    address: "0x28915D1DF4d6d5dF90F0B4B3d626600b106953Bf",
    functionName: "currentPrice",
    args: [],
  });

  const { data: currentLevel } = useReadContract({
    abi: MTT3,
    address: "0x28915D1DF4d6d5dF90F0B4B3d626600b106953Bf",
    functionName: "currentLevel",
    args: [],
  });
  const displaySupply = currentSupply ? currentSupply.toString() : "0";
  const displayPrice = currentPrice ? (Number(currentPrice) / 1e18).toString() : "0";
  const displayLevel = currentLevel ? currentLevel.toString() : "0";

  return (
    <HStack className="centerHStack">
      <InfoText label="MTT3 current Supply" value={displaySupply} />
      <InfoText label="MTT3 current Price Level" value={displayLevel} />
      <InfoText label="MTT3 current Price" value={displayPrice} />
    </HStack>
  );
};

export default ContractStatus;
