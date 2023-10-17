import { type FC } from "react";

import { Box, Text } from "@chakra-ui/react";
import { useAccount } from "wagmi";

const Status: FC = () => {
  const { isConnecting, isConnected } = useAccount();

  const statusMapping = {
    isConnecting: "🟡 Connecting",
    isConnected: "🟢 Connected",
    default: "⚪️ Disconnected",
  };

  let status = statusMapping.default;
  if (isConnecting) {
    status = statusMapping.isConnecting;
  } else if (isConnected) {
    status = statusMapping.isConnected;
  }

  return (
    <Box>
      <Text>
        Account status: <span style={{ fontWeight: "800" }}>{status}</span>
      </Text>
    </Box>
  );
};

export default Status;
