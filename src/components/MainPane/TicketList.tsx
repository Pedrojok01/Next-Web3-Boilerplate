// components/MainPane.tsx
import { type FC } from "react";

import { Box, Heading, useColorMode } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

import { TicketTable } from "@/components/MainPane/components/TicketTable";
import styles from "@/styles/mainPane.module.css";

const TicketList: FC = () => {
  const { colorMode } = useColorMode();
  const { isConnected } = useAccount();

  return (
    <Box
      className={styles.container}
      border={colorMode === "light" ? "none" : "1px solid rgba(152, 161, 192, 0.24)"}
    >
      <Heading as="h2" fontSize={"2rem"} mb={10} className="text-shadow">
        Your Tickets
      </Heading>

      {isConnected ? <TicketTable /> : <ConnectButton />}
    </Box>
  );
};

export default TicketList;
