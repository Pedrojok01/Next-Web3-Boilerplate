import { type FC } from "react";

import { Box, Text } from "@chakra-ui/react";
import { useNetwork } from "wagmi";

const Chain: FC = () => {
  const { chain } = useNetwork();

  return (
    <Box>
      <Text>
        Chain:{" "}
        <span style={{ fontWeight: "800" }}>
          {chain?.name} ({chain?.id})
        </span>
      </Text>
    </Box>
  );
};

export default Chain;
