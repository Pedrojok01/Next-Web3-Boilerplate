import type { FC } from "react";

import { HStack, Spacer } from "@chakra-ui/react";
import { useReadContract } from "wagmi";

import { InfoText } from "@/components";
import { SMART_CONTRACT_ADDRESS } from "@/utils/constants";

import MTT3 from "../../../contracts/ERC1919.json";

const ContractStatus: FC = (): JSX.Element => {
  const { data: currentSupply } = useReadContract({
    abi: MTT3,
    address: SMART_CONTRACT_ADDRESS,
    functionName: "currentSupply",
    args: [],
  });

  const { data: currentPrice } = useReadContract({
    abi: MTT3,
    address: SMART_CONTRACT_ADDRESS,
    functionName: "currentPrice",
    args: [],
  });

  const { data: currentLevel } = useReadContract({
    abi: MTT3,
    address: SMART_CONTRACT_ADDRESS,
    functionName: "currentLevel",
    args: [],
  });
  const displaySupply = currentSupply ? (Number(currentSupply) / 1e18).toString() : "0";
  const displayPrice = currentPrice ? (Number(currentPrice) / 1e18).toString() : "0";
  const displayLevel = currentLevel ? currentLevel.toString() : "0";

  return (
    <HStack className="centerHStack">
      <Spacer />
      <InfoText label="MTT3 current Supply" value={displaySupply} width={200} />
      <InfoText label="MTT3 current Price Level" value={displayLevel} width={200} />
      <InfoText label="MTT3 current Price" value={displayPrice} width={200} />
      <Spacer />
    </HStack>
  );
};

export default ContractStatus;
