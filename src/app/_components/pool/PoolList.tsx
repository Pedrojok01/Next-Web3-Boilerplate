import React from "react";

import {
  Box,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Stack,
  StackDivider,
  Tag,
  Text,
  Tooltip,
} from "@chakra-ui/react";

import PoolState from "@/app/_components/pool/PoolState";
import CreateTicket from "@/app/_components/ticket/CreateTicket";
import { type PoolStateType } from "@/server/lib/LotteryService";
import { api } from "@/trpc/react";
import { cronExpressionToDescription } from "@/utils/cronExpressionToDesc";

function PoolList() {
  const { data } = api.pool.poolStateList.useQuery();
  const records = data?.result as Array<PoolStateType>;
  console.log(records);
  records?.sort((a, b) => b.pool.name.localeCompare(a.pool.name));

  return (
    <Stack spacing="3">
      <CreateTicket poolStateList={records} />
      {records?.map((poolState) => {
        return (
          <Card
            direction={{ base: "column", sm: "row" }}
            overflow="hidden"
            variant="outline"
            key={poolState.pool.poolCode}
          >
            <Image
              objectFit="cover"
              maxW={{ base: "100%", sm: "100px" }}
              src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
              alt="Caffe Latte"
            />
            <CardBody>
              <Stack divider={<StackDivider />} spacing="4">
                <Box>
                  <Heading size="xs" textTransform="uppercase">
                    <Tag>{poolState.pool.name}</Tag>{" "}
                    <Tag bg="red.200">{poolState.pool.difficulty}</Tag>
                  </Heading>
                  <Text>
                    <Tooltip
                      label={cronExpressionToDescription(poolState.pool.period)}
                      aria-label="A tooltip"
                    >
                      <Tag mt={1} fontSize={"sm"}>
                        {poolState.pool.poolCode}【{poolState.pool.period}】
                      </Tag>
                    </Tooltip>
                  </Text>
                </Box>
                <Box>
                  {poolState.currentPhase && (
                    <PoolState
                      title="Current"
                      pool={poolState.pool}
                      phaseResult={poolState.currentPhase}
                    />
                  )}
                </Box>
                <Box>
                  {poolState.lastPhase && (
                    <PoolState
                      title="Last"
                      pool={poolState.pool}
                      phaseResult={poolState.lastPhase}
                    />
                  )}
                </Box>
              </Stack>
            </CardBody>
            <CardFooter></CardFooter>
          </Card>
        );
      })}
    </Stack>
  );
}

export default PoolList;
