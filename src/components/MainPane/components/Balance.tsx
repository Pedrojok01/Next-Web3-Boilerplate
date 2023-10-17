import { type FC } from "react";

import { Box, Text } from "@chakra-ui/react";
import { useAccount, useBalance } from "wagmi";

const Balance: FC = () => {
  const { address } = useAccount();
  const { data } = useBalance({
    address,
    watch: true,
  });

  return (
    <Box fontSize={"1.1rem"}>
      <Text>
        Balance:
        <span style={{ fontWeight: "800" }}>
          {data?.formatted
            ? `
          Ξ ${data?.formatted}`
            : 0}
        </span>
      </Text>
    </Box>
  );
};

export default Balance;
