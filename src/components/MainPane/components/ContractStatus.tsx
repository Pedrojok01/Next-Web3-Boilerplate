import { useEffect, type FC } from "react";

import { HStack, Spacer } from "@chakra-ui/react";

import { InfoText } from "@/components";
import { useContractStatus } from "@/hooks";

const ContractStatus: FC = (): JSX.Element => {
  const { currentSupply, currentPrice, currentLevel, contractBalance } = useContractStatus();

  const displaySupply = currentSupply ? (Number(currentSupply) / 1e18).toString() : "0";
  const displayPrice = currentPrice ? (Number(currentPrice) / 1e18).toString() : "0";
  const displayLevel = currentLevel ? currentLevel.toString() : "0";
  const displayBalance = contractBalance ? (Number(contractBalance.value) / 1e18).toString() : "0";

  useEffect(() => {
    //
  }, [displayBalance]);

  return (
    <HStack className="centerHStack">
      <Spacer />
      <InfoText label="MTT3 current Supply" value={displaySupply} width={200} />
      <InfoText label="MTT3 current Price Level" value={displayLevel} width={200} />
      <InfoText label="MTT3 current Price" value={displayPrice} width={200} />
      <InfoText label="MTT3 Contract Balance (MATIC)" value={displayBalance} width={200} />
      <Spacer />
    </HStack>
  );
};

export default ContractStatus;
