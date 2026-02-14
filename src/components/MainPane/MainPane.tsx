"use client";

import { type FC } from "react";

import { Box, Separator, Flex, Heading } from "@chakra-ui/react";
import { useAccount } from "wagmi";

import { useColorModeValue } from "@/hooks";
import styles from "@/styles/mainPane.module.css";

import {
  Status,
  Address,
  Chain,
  Balance,
  BlockNumber,
  TransferNative,
  SignMessage,
} from "./components";

const MainPane: FC = () => {
  const { isConnected } = useAccount();
  const border = useColorModeValue("none", "1px solid rgba(152, 161, 192, 0.24)");

  return (
    <Box className={styles.container} border={border}>
      <Heading as="h2" fontSize="2rem" mb={10} className="text-shadow">
        Display Info
      </Heading>

      <Flex className={styles.content}>
        <Status />

        {isConnected && (
          <>
            <Address />
            <Chain />
            <Balance />
            <BlockNumber />

            <Separator mb={5} />

            <Flex w="100%" display="flex" justifyContent="space-around" flexWrap="wrap" gap={5}>
              <SignMessage />
              <TransferNative />
            </Flex>
          </>
        )}
      </Flex>
    </Box>
  );
};

export default MainPane;
