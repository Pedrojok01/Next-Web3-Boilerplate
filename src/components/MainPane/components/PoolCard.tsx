import { useEffect } from "react";

import { ExternalLinkIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Card,
  CardBody,
  HStack,
  Heading,
  Input,
  Link,
  Stack,
  Tag,
  Text,
  useNumberInput,
} from "@chakra-ui/react";
import { nanoid } from "nanoid";
import NextLink from "next/link";
import { useSearchParams } from "next/navigation";
import { parseEther } from "viem";
import { useAccount, useSendTransaction, useWaitForTransaction } from "wagmi";

import { CHAIN_CONFIG, FUND_WALLET_ADDRESS, TICKET_PRICE } from "@/const";
import { useNotify } from "@/hooks";
import type { PoolStateType } from "@/server/lib/LotteryService";
import { api } from "@/trpc/react";
import { getEllipsisTxt } from "@/utils/formatters";

export const PoolCard = ({ pool }: PoolStateType) => {
  const { name, difficulty, price, poolCode } = pool;
  const { data, error, isLoading, isError, sendTransaction } = useSendTransaction();
  const { data: receipt, isLoading: isPending } = useWaitForTransaction({ hash: data?.hash });
  const { notifyError, notifySuccess } = useNotify();
  const { address } = useAccount();
  const searchParams = useSearchParams();

  const saveOrUpdate = api.user.saveTickets.useMutation({
    onSuccess: () => {
      notifySuccess({
        title: "Successfully bought tickets!",
        message: (
          <>
            {receipt?.transactionHash && (
              <>
                Hash:
                <Link href={`${CHAIN_CONFIG}/tx/${receipt?.transactionHash}`} isExternal>
                  {" "}
                  {getEllipsisTxt(receipt?.transactionHash)}
                  <ExternalLinkIcon mx="2px" />
                </Link>
              </>
            )}
            <Box>
              <Link as={NextLink} href="/ticket">
                Check your tickets
              </Link>
            </Box>
          </>
        ),
      });
    },
    onError: (error) => {
      notifyError({
        title: "Purchase Failed:",
        message: error.message,
      });
    },
  });

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
      saveOrUpdate.mutate({
        poolCode,
        ticketNum: ticketAmount,
        address: address as string,
        txHash: nanoid(5),
        txTime: new Date().getTime(),
        referral: searchParams.get("referral") ?? undefined,
      });
    }

    if (isError && error) {
      notifyError({
        title: "An error occured:",
        message: error.message,
      });
    }
  }, [receipt, isError, error, notifySuccess, notifyError]);
  return (
    <Card maxW="sm">
      <CardBody>
        <Stack mt="6" spacing="3">
          <HStack justifyContent="center">
            <Heading size="md">{name}</Heading>
            <Tag colorScheme={difficulty === "MATCH" ? "red" : "green"}>{difficulty}</Tag>
          </HStack>

          <Text>Price {(price * Number(ticketAmount)).toFixed(4)} ETH</Text>

          <HStack maxW="200px" mb={2}>
            <Button {...dec}>-</Button>
            <Input {...input} style={{ textAlign: "center" }} />
            <Button {...inc}>+</Button>
          </HStack>
          <Button onClick={handleTransfer} isLoading={isLoading || isPending}>
            Buy tickets
          </Button>
        </Stack>
      </CardBody>
    </Card>
  );
};
