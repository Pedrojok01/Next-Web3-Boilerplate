import { type FC } from "react";

import { Box, Text } from "@chakra-ui/react";
import { useBlockNumber } from "wagmi";

const BlockNumber: FC = () => {
  const { data } = useBlockNumber({ watch: true });

  return (
    <Box>
      <Text>
        Block Number: <span style={{ fontWeight: "800" }}>{data?.toString()}</span>
      </Text>
    </Box>
  );
};

export default BlockNumber;
