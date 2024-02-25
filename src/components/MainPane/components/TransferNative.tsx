import { type FC, useState, useEffect } from "react";

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
import { isAddress, parseEther } from "viem";
import { useSendTransaction, useWaitForTransactionReceipt } from "wagmi";

import { AddressInput } from "@/components";
import { useNotify } from "@/hooks";

const TransferNative: FC = () => {
  const { data, error, isPending, isError, sendTransaction } = useSendTransaction();
  const { data: receipt, isLoading } = useWaitForTransactionReceipt({ hash: data });
  const { notifyError, notifySuccess } = useNotify();
  const [amount, setAmount] = useState<string>("0");
  const [receiver, setReceiver] = useState<string>("");

  const handleAmountChange = (valueAsString: string): void => {
    setAmount(valueAsString);
  };

  const handleTransfer = () => {
    if (receiver.length === 0 || !isAddress(receiver)) {
      return notifyError({
        title: "Error:",
        message: "The receiver address is not set!",
      });
    }

    if (parseFloat(amount) <= 0) {
      return notifyError({
        title: "Error:",
        message: "The amount to send must be greater than 0.",
      });
    }

    sendTransaction({
      to: receiver,
      value: parseEther(amount),
    });
  };

  useEffect(() => {
    if (receipt) {
      notifySuccess({
        title: "Transfer successfully sent!",
        message: `Hash: ${receipt.transactionHash}`,
      });
      setAmount("0");
      setReceiver("");
    }

    if (isError && error) {
      notifyError({
        title: "An error occured:",
        message: error.message,
      });
    }
  }, [receipt, isError, error, notifyError, notifySuccess]);

  return (
    <VStack w={"45%"} minWidth={"270px"} gap={2}>
      <AddressInput receiver={receiver} setReceiver={setReceiver} />

      <HStack>
        <NumberInput
          value={amount}
          min={0}
          onChange={handleAmountChange}
          step={0.00000001}
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
          isLoading={isLoading || isPending}
          className="custom-button"
        >
          Transfer
        </Button>
      </HStack>
    </VStack>
  );
};

export default TransferNative;
