// components/MainPane.tsx
import { type FC } from "react";

import { Box, Divider, Flex, HStack, Heading, Spacer, useColorMode } from "@chakra-ui/react";
import { useAccount } from "wagmi";

import { useGetBalance, useContractStatus } from "@/hooks";
import styles from "@/styles/mainPane.module.css";
import { SMART_CONTRACT_ADDRESS } from "@/utils/constants";

import { Status, Address, Chain, ERC1919Balance, Buy, Sell } from "./components";
import ContractStatus from "./components/ContractStatus";
import { InfoText } from "../InfoText";

const MainPane: FC = () => {
  const { isConnected } = useAccount();
  const { colorMode } = useColorMode();
  const { refetch: refetchBalance } = useGetBalance();
  const { refetchContract: refetchContract } = useContractStatus();

  return (
    <Box
      className={styles.container}
      border={colorMode === "light" ? "none" : "1px solid rgba(152, 161, 192, 0.24)"}
    >
      <HStack className="centerHStack" margin={10}>
        <Spacer />
        <Heading as="h2" fontSize={"2rem"} className="text-shadow">
          Blockchain Data
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
            <InfoText label="MTT3 Contract Address" value={SMART_CONTRACT_ADDRESS} />

            <ContractStatus />
            <ERC1919Balance />
            {/* <InfoText label="MTT3 Balance" value={contextValue.b} /> */}

            <Divider mb={5} />

            <Flex
              w={"100%"}
              display={"flex"}
              justifyContent={"space-around"}
              flexWrap={"wrap"}
              gap={5}
            >
              <Buy
                refreshData={() => {
                  refetchBalance();
                  refetchContract();
                }}
              />
              <Sell
                refreshData={() => {
                  refetchBalance();
                  refetchContract();
                }}
              />
            </Flex>
          </>
        )}
      </Flex>
    </Box>
  );
};

export default MainPane;
