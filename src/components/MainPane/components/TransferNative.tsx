import { type FC, useState, useEffect } from "react";

import { Button, HStack, NumberInput, VStack } from "@chakra-ui/react";
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

  const handleAmountChange = (value: { value: string }): void => {
    setAmount(value.value);
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

    sendTransaction({ to: receiver, value: parseEther(amount) });
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
      notifyError({ title: "An error occured:", message: error.message });
    }
  }, [receipt, isError, error, notifyError, notifySuccess]);

  return (
    <VStack w={"45%"} minWidth={"270px"} gap={2}>
      <AddressInput receiver={receiver} setReceiver={setReceiver} />

      <HStack>
        <NumberInput.Root
          value={amount}
          onValueChange={handleAmountChange}
          step={0.00000001}
          min={0}
          formatOptions={{ minimumFractionDigits: 0, maximumFractionDigits: 8 }}
          css={{
            border: "1px solid rgba(152, 161, 192, 0.24)",
            borderRadius: "12px",
            boxShadow: "3px 4px 4px rgba(0, 0, 0, 0.4)",
            overflow: "hidden",
            flex: 1,
          }}
        >
          <NumberInput.Input css={{ border: "none" }} />
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
