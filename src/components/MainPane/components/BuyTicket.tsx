import { useEffect, type FC } from "react";

import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Box, Button, HStack, Input, Link, Text, VStack, useNumberInput } from "@chakra-ui/react";
import NextLink from "next/link";
import { parseEther } from "viem";
import { useConfig, useSendTransaction, useWaitForTransaction } from "wagmi";

import { CHAIN_CONFIG, FUND_WALLET_ADDRESS, TICKET_PRICE } from "@/const";
import { useNotify } from "@/hooks";
import { getEllipsisTxt } from "@/utils/formatters";

const BuyTicket: FC = () => {
  const { data, error, isLoading, isError, sendTransaction } = useSendTransaction();
  const { data: receipt, isLoading: isPending } = useWaitForTransaction({ hash: data?.hash });
  const { notifyError, notifySuccess } = useNotify();

  const {
    getInputProps,
    getIncrementButtonProps,
    getDecrementButtonProps,
    valueAsNumber: ticketAmount,
  } = useNumberInput({
    step: 1,
    defaultValue: 1,
    min: 1,

    precision: 0,
    clampValueOnBlur: true,
  });

  const config = useConfig();
  console.log(config);
  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();

  const handleTransfer = () => {
    sendTransaction({
      to: FUND_WALLET_ADDRESS,
      value: parseEther((ticketAmount * TICKET_PRICE).toString()),
    });
  };

  useEffect(() => {
    if (receipt) {
      notifySuccess({
        title: "Successfully bought tickets!",
        message: (
          <>
            Hash:
            <Link href={`${CHAIN_CONFIG}/tx/${receipt.transactionHash}`} isExternal>
              {" "}
              {getEllipsisTxt(receipt.transactionHash)}
              <ExternalLinkIcon mx="2px" />
            </Link>
            <Box>
              <Link as={NextLink} href="/ticket">
                Check your tickets
              </Link>
            </Box>
          </>
        ),
      });
    }

    if (isError && error) {
      notifyError({
        title: "An error occured:",
        message: error.message,
      });
    }
  }, [receipt, isError, error, notifyError, notifySuccess]);

  return (
    <VStack w={{ base: "100%" }} minWidth={"270px"} gap={2}>
      <HStack mb={3}>
        <Text>Price {(TICKET_PRICE * Number(ticketAmount)).toFixed(4)} ETH</Text>
        {/* <NumberInput
          maxW={24}
          precision={0}
          value={ticketAmount}
          min={1}
          onChange={handleAmountChange}
          step={1}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper>+</NumberIncrementStepper>
            <NumberDecrementStepper>-</NumberDecrementStepper>
          </NumberInputStepper>
        </NumberInput> */}
        <HStack maxW="200px">
          <Button {...dec}>-</Button>
          <Input {...input} style={{ textAlign: "center" }} />
          <Button {...inc}>+</Button>
        </HStack>
      </HStack>
      <Button onClick={handleTransfer} isLoading={isLoading || isPending}>
        Buy tickets
      </Button>
    </VStack>
  );
};

export default BuyTicket;
