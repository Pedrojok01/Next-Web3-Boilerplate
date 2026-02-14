import { type FC, useState, useCallback } from "react";

import { Button, HStack, NumberInput, VStack } from "@chakra-ui/react";
import { waitForTransactionReceipt } from "@wagmi/core";
import { isAddress, parseEther } from "viem";
import { useConfig, useSendTransaction } from "wagmi";

import { AddressInput } from "@/components";
import { useNotify } from "@/hooks";

const TransferNative: FC = () => {
  const config = useConfig();
  const { isPending, sendTransactionAsync, reset: resetTransaction } = useSendTransaction();
  const { notifyError, notifySuccess } = useNotify();
  const [amount, setAmount] = useState<string>("0");
  const [receiver, setReceiver] = useState<string>("");
  const [isWaitingReceipt, setIsWaitingReceipt] = useState(false);

  const resetData = useCallback(() => {
    setAmount("0");
    setReceiver("");
  }, []);

  const handleAmountChange = (value: { value: string }): void => {
    setAmount(value.value);
  };

  const handleTransfer = async () => {
    if (receiver.length === 0 || !isAddress(receiver)) {
      return notifyError({ title: "Error:", message: "The receiver address is not set!" });
    }

    if (parseFloat(amount) <= 0) {
      return notifyError({
        title: "Error:",
        message: "The amount to send must be greater than 0.",
      });
    }

    try {
      const value = parseEther(amount);
      const hash = await sendTransactionAsync({ to: receiver, value });
      setIsWaitingReceipt(true);
      const receipt = await waitForTransactionReceipt(config, { hash });
      notifySuccess({
        title: "Transfer successfully sent!",
        message: `Hash: ${receipt.transactionHash || "Unknown"}`,
      });
      resetData();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Transaction failed";
      notifyError({
        title: "An error occurred:",
        message: errorMessage,
      });
    } finally {
      setIsWaitingReceipt(false);
      resetTransaction();
    }
  };

  return (
    <VStack w={"45%"} minWidth={"270px"} gap={2}>
      <AddressInput
        receiver={receiver}
        setReceiver={(value) => {
          setReceiver(value);
          resetTransaction();
        }}
      />

      <HStack w={"100%"}>
        <NumberInput.Root
          value={amount}
          onValueChange={(value) => {
            handleAmountChange(value);
            resetTransaction();
          }}
          step={0.00000001}
          min={0}
          formatOptions={{ minimumFractionDigits: 0, maximumFractionDigits: 8 }}
          className="custom-input"
          flex={1}
          overflow="hidden"
        >
          <NumberInput.Input
            css={{
              border: "none",
              paddingLeft: "16px",
              paddingRight: "16px",
            }}
          />
          <NumberInput.Control>
            <NumberInput.IncrementTrigger />
            <NumberInput.DecrementTrigger />
          </NumberInput.Control>
        </NumberInput.Root>

        <Button
          variant="ghost"
          onClick={handleTransfer}
          loading={isWaitingReceipt || isPending}
          className="custom-button"
          h="40px"
          minW="100px"
        >
          Transfer
        </Button>
      </HStack>
    </VStack>
  );
};

export default TransferNative;
