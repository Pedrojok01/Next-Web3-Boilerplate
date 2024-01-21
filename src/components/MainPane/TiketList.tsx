// components/MainPane.tsx
import { type FC } from "react";

import { Box, Divider, Flex, Heading, useColorMode } from "@chakra-ui/react";
import { useAccount } from "wagmi";

import { TicketTable } from "@/components/MainPane/components/TicketTable";
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

const TicketList: FC = () => {
  const { isConnected } = useAccount();
  const { colorMode } = useColorMode();

  return (
    <Box
      className={styles.container}
      border={colorMode === "light" ? "none" : "1px solid rgba(152, 161, 192, 0.24)"}
    >
      <Heading as="h2" fontSize={"2rem"} mb={10} className="text-shadow">
        Your Tickets
      </Heading>

      <Flex className={styles.content}>
        <TicketTable />
      </Flex>
    </Box>
  );
};

export default TicketList;
