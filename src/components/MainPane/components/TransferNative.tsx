import { type FC, useState, useEffect, useCallback } from "react";

import { Button, HStack, NumberInput, VStack } from "@chakra-ui/react";
import { isAddress, parseEther } from "viem";
import { useSendTransaction, useWaitForTransactionReceipt } from "wagmi";

import { AddressInput } from "@/components";
import { useNotify } from "@/hooks";

const TransferNative: FC = () => {
  const {
    data,
    error,
    isPending,
    isError,
    sendTransaction,
    reset: resetTransaction,
  } = useSendTransaction();
  const { data: receipt, isLoading } = useWaitForTransactionReceipt({
    hash: data,
  });
  const { notifyError, notifySuccess } = useNotify();
  const [amount, setAmount] = useState<string>("0");
  const [receiver, setReceiver] = useState<string>("");
  const [hasShownError, setHasShownError] = useState<boolean>(false);
  const [hasShownSuccess, setHasShownSuccess] = useState<boolean>(false);

  const resetData = useCallback(() => {
    setAmount("0");
    setReceiver("");
    setHasShownError(false);
    setHasShownSuccess(false);
  }, []);

  const resetAll = useCallback(() => {
    resetData();
    if (resetTransaction) resetTransaction();
  }, [resetData, resetTransaction]);

  const handleAmountChange = (value: { value: string }): void => {
    setAmount(value.value);
    setHasShownError(false);
    setHasShownSuccess(false);
  };

  const handleTransfer = () => {
    if (receiver.length === 0 || !isAddress(receiver)) {
      return notifyError({ title: "Error:", message: "The receiver address is not set!" });
    }

    if (parseFloat(amount) <= 0) {
      return notifyError({
        title: "Error:",
        message: "The amount to send must be greater than 0.",
      });
    }

    resetAll();
    sendTransaction({ to: receiver, value: parseEther(amount) });
  };

  useEffect(() => {
    if (receipt && !hasShownSuccess) {
      try {
        notifySuccess({
          title: "Transfer successfully sent!",
          message: `Hash: ${receipt.transactionHash || "Unknown"}`,
        });
        setHasShownSuccess(true);
        setAmount("0");
        setReceiver("");
      } catch (err) {
        console.error("Error processing receipt:", err);
      }

      // Schedule reset of transaction data after notification is shown
      setTimeout(() => {
        if (resetTransaction) resetTransaction();
      }, 100);
    }

    if (isError && error && !hasShownError) {
      // Ensure we have a string message
      const errorMessage = typeof error.message === "string" ? error.message : "Transaction failed";

      notifyError({
        title: "An error occurred:",
        message: errorMessage,
      });
      setHasShownError(true);

      // Schedule reset of transaction data after notification is shown
      setTimeout(() => {
        if (resetTransaction) resetTransaction();
      }, 100);
    }
  }, [
    receipt,
    isError,
    error,
    notifyError,
    notifySuccess,
    hasShownError,
    hasShownSuccess,
    resetTransaction,
  ]);

  return (
    <VStack w={"45%"} minWidth={"270px"} gap={2}>
      <AddressInput
        receiver={receiver}
        setReceiver={(value) => {
          setReceiver(value);
          setHasShownError(false);
          setHasShownSuccess(false);

          // Clear any previous transaction data
          if (resetTransaction) resetTransaction();
        }}
      />

      <HStack w={"100%"}>
        <NumberInput.Root
          value={amount}
          onValueChange={(value) => {
            handleAmountChange(value);

            // Clear any previous transaction data
            if (resetTransaction) resetTransaction();
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
          loading={isLoading || isPending}
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
