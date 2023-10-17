import { type FC, useState } from "react";

import {
  Button,
  HStack,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  VStack,
} from "@chakra-ui/react";
import { useAccount, useBalance } from "wagmi";

import { AddressInput } from "@/components/AddressInput";
import { useTransferNative } from "@/hooks";

const TransferNative: FC = () => {
  const { address } = useAccount();
  const { data } = useBalance({
    address,
    watch: true,
  });
  const { transferNative, isLoading } = useTransferNative();

  const [amount, setAmount] = useState<number>(0);
  const [receiver, setReceiver] = useState<string | undefined>(undefined);

  const handleAmountChange = (_valueAsString: string, valueAsNumber: number): void => {
    setAmount(valueAsNumber);
  };

  const handleTransfer = (): void => {
    if (amount > 0 && receiver) {
      transferNative(receiver, amount);
    }
  };

  return (
    <VStack w={"45%"} minWidth={"270px"} gap={2}>
      <AddressInput setReceiver={setReceiver} />

      <HStack>
        <NumberInput value={amount} min={0} max={data?.decimals ?? 0} onChange={handleAmountChange}>
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>

        <Button
          variant="ghost"
          onClick={handleTransfer}
          isLoading={isLoading}
          className="custom-button"
        >
          Transfer
        </Button>
      </HStack>
    </VStack>
  );
};

export default TransferNative;
