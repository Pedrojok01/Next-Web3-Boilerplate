// components/MainPane.tsx
import { useContext, useState, type FC } from "react";

import { Box, Divider, Flex, HStack, Heading, Spacer, useColorMode } from "@chakra-ui/react";
import { useAccount } from "wagmi";

import { useGetBalance } from "@/hooks";
import styles from "@/styles/mainPane.module.css";

import { Status, Address, Chain, ERC1919Balance, Buy, Sell } from "./components";
import ContractStatus from "./components/ContractStatus";
import { Context } from "./web3/context";
import { InfoText } from "../InfoText";

const MainPane: FC = () => {
  const { isConnected } = useAccount();
  const { colorMode } = useColorMode();
  const [, setRefresh] = useState(0);
  const { b, setB } = useContext(Context);
  const contextValue = { b, setB };
  const { refetch: refetchBalance } = useGetBalance();

  return (
    <Box
      className={styles.container}
      border={colorMode === "light" ? "none" : "1px solid rgba(152, 161, 192, 0.24)"}
    >
      <HStack className="centerHStack">
        <Spacer />
        <Heading as="h2" fontSize={"2rem"} mb={10} className="text-shadow">
          Display Info
        </Heading>
        <Spacer />
        <Status />
        <Chain />
        <Spacer />
      </HStack>

      <Flex className={styles.content}>
        {isConnected && (
          <>
            <Address />
            <InfoText
              label="MTT3 Contract Address"
              value="0x28915D1DF4d6d5dF90F0B4B3d626600b106953Bf"
            />
            <Context.Provider value={contextValue}>
              <ContractStatus />
              <ERC1919Balance />
              {/* <InfoText label="MTT3 Balance" value={contextValue.b} /> */}
            </Context.Provider>

            <Divider mb={5} />

            <Flex
              w={"100%"}
              display={"flex"}
              justifyContent={"space-around"}
              flexWrap={"wrap"}
              gap={5}
            >
              <Buy refreshData={() => setRefresh((prev) => prev + 1)} />
              <Sell refreshData={() => refetchBalance()} />
            </Flex>
          </>
        )}
      </Flex>
    </Box>
  );
};

export default MainPane;
