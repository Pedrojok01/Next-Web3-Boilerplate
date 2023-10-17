// components/MainPane.tsx
import { type FC } from "react";

import { Box, Flex, Heading, useColorMode } from "@chakra-ui/react";

import styles from "@/styles/mainPane.module.css";

import {
  Status,
  Address,
  Chain,
  Balance,
  BlockNumber,
  //   TransferEth,
  //   SignMessage,
} from "./components";

const MainPane: FC = () => {
  const { colorMode } = useColorMode();

  return (
    <Box
      className={styles.container}
      border={colorMode === "light" ? "none" : "1px solid rgba(152, 161, 192, 0.24)"}
    >
      <Heading as="h2" fontSize={"1.7rem"} mb={8}>
        Display Info
      </Heading>

      <Flex className={styles.content}>
        <Status />
        <Address />
        <Chain />
        <Balance />
        <BlockNumber />

        {/* {isActive && (
          <>
            <Divider />
            <div style={styles.action}>
              <SignMessage />
              {!isMobile && <Divider type="vertical" style={{ fontSize: "120px !important" }} />}
              <TransferEth />
            </div>
          </>
        )} */}
      </Flex>
    </Box>
  );
};

export default MainPane;
