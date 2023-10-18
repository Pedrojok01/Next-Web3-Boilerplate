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

import { AddressInput } from "@/components";
import { useTransferNative } from "@/hooks";

const TransferNative: FC = () => {
  const { transferNative, isLoading } = useTransferNative();

  const [amount, setAmount] = useState<string>("0");
  const [receiver, setReceiver] = useState<string | undefined>(undefined);

  const handleAmountChange = (valueAsString: string): void => {
    setAmount(valueAsString);
  };

  const handleTransfer = (): void => {
    if (parseFloat(amount) > 0 && receiver) {
      transferNative(receiver, parseFloat(amount));
    }
  };

  return (
    <VStack w={"45%"} minWidth={"270px"} gap={2}>
      <AddressInput setReceiver={setReceiver} />

      <HStack>
        <NumberInput
          value={amount}
          min={0}
          onChange={handleAmountChange}
          step={0.0001}
          precision={8}
        >
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
