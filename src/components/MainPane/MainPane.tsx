// components/MainPane.tsx
import { type FC } from "react";

import { Box, Flex, Heading, useColorMode } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

import { Prize } from "@/components/MainPane/components/Prize";
import styles from "@/styles/mainPane.module.css";

import { BuyTicket } from "./components";

const MainPane: FC = () => {
  const { isConnected } = useAccount();
  const { colorMode } = useColorMode();

  return (
    <Box
      className={styles.container}
      border={colorMode === "light" ? "none" : "1px solid rgba(152, 161, 192, 0.24)"}
    >
      <Heading as="h2" fontSize={"2rem"} mb={10}>
        Daily Lotto
      </Heading>
      <Prize />

      <Flex className={styles.content} alignItems="center">
        {isConnected ? (
          <>
            <Flex
              w={"100%"}
              display={"flex"}
              justifyContent={"space-around"}
              flexWrap={"wrap"}
              gap={5}
            >
              <BuyTicket />
            </Flex>
          </>
        ) : (
          <ConnectButton />
        )}
      </Flex>
    </Box>
  );
};

export default MainPane;
