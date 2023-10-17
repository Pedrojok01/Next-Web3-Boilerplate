import { type FC } from "react";

import { Box, Text } from "@chakra-ui/react";
import { useAccount, useEnsName } from "wagmi";

import { useWindowSize } from "@/hooks";
import { getEllipsisTxt } from "@/utils/formatters";

const Address: FC = () => {
  const { address } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const { isMobile } = useWindowSize();

  const displayedAddress = isMobile && address ? getEllipsisTxt(address, 4) : address;

  return (
    <Box>
      <Text fontSize={"1.1rem"}>
        Address: <span style={{ fontWeight: "800" }}>{ensName ?? displayedAddress}</span>
      </Text>
    </Box>
  );
};

export default Address;
