import React from "react";

import { Alert, Box, Button, Divider, Flex, Heading } from "@chakra-ui/react";

import { Difficulty } from "@/server/lib/types";
import { api } from "@/trpc/react";

function Lottery() {
  const { data } = api.pool.poolList.useQuery();
  const records = data?.result as Record<string, {
    poolHash: string
    name: string,
    difficulty: Difficulty,
    period: number
  }>;
  console.log(records);

  return (
    <Box>
      <Heading as="h2" fontSize={"1.5rem"} mb={10} className="text-shadow">
        Lottery Detail
      </Heading>
      {
        Object.keys(records ?? {}).map(key => {
          return <>
            <Flex p={2} key={`lf${key}`} style={{ fontSize: "12px" }}>
              <Alert status={"warning"}>
                |||PoolHash:{key}｜｜｜Lottery results：xxx｜｜｜Hits:xxx
              </Alert>
            </Flex>
          </>;
        })
      }
      <Divider mb={5} />
      <Button mb={5}
              variant="ghost"
              className="custom-button"
      >Lottery Mock</Button>
      <Button mb={5}
              variant="ghost"
              className="custom-button"
      >Check Ticket</Button>
      <Divider mb={5} />
    </Box>
  );
}

export default Lottery;