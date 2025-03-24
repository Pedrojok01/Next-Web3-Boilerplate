import { type FC } from "react";

import { Box, Skeleton } from "@chakra-ui/react";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";

type JazziconsProps = {
  seed?: string;
  size?: number;
};

const Jazzicons: FC<JazziconsProps> = ({ seed, size = 16 }) => {
  if (!seed) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Skeleton height={10} width={9} borderRadius="12px 0px 0px 12px" />
      </Box>
    );
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center" pl={2}>
      <Jazzicon seed={jsNumberForAddress(seed)} diameter={size} />
    </Box>
  );
};

export default Jazzicons;
