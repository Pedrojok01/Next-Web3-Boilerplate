import { type FC } from "react";

import { Box, Grid, GridItem } from "@chakra-ui/react";

import { PoolCard } from "@/components/MainPane/components/PoolCard";
import type { PoolStateType } from "@/server/lib/LotteryService";
import { api } from "@/trpc/react";

const BuyTicket: FC = () => {
  const { data: poolData } = api.pool.poolStateList.useQuery();
  const pools = poolData?.result as Array<PoolStateType>;

  return (
    <Box p={{ xs: 2, sm: 4 }}>
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        {pools?.map((pool) => (
          <GridItem key={pool.pool.name} w="100%">
            <PoolCard {...pool} />
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
};

export default BuyTicket;
