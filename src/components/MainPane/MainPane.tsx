// components/MainPane.tsx
import { type FC } from "react";

import { Box, Separator, Flex, Heading } from "@chakra-ui/react";
import { useTheme } from "next-themes";
import { useAccount } from "wagmi";

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
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  return (
    <Box
      className={styles.container}
      border={isDarkMode ? "1px solid rgba(152, 161, 192, 0.24)" : "none"}
    >
      <Heading as="h2" fontSize={"2rem"} mb={10} className="text-shadow">
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

            <Flex
              w={"100%"}
              display={"flex"}
              justifyContent={"space-around"}
              flexWrap={"wrap"}
              gap={5}
            >
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
