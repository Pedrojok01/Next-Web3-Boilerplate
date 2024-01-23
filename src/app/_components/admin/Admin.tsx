import React from "react";

import {
  AbsoluteCenter,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  SimpleGrid,
  Tag,
} from "@chakra-ui/react";

import { type PoolType } from "@/server/lib/LotteryService";
import { api } from "@/trpc/react";

function Admin() {
  const phaseLottery = api.lottery.phaseLottery.useMutation({
    onSuccess: (data) => {
      console.log(data.result);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const { data } = api.pool.poolList.useQuery();
  const records = data?.result as Array<PoolType>;
  records?.sort((a, b) => a.name.localeCompare(b.name));
  const initPool = api.admin.initPool.useMutation({
    onSuccess: (data) => {
      console.log(data.result);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <>
      {" "}
      <SimpleGrid spacing={4} templateColumns="repeat(auto-fill, minmax(200px, 1fr))">
        {records?.map((entry) => {
          return (
            <Card key={entry.poolCode}>
              <CardHeader>
                <Heading size="md"> {entry.name}</Heading>
              </CardHeader>
              <CardBody>
                <Tag>{entry.poolCode}</Tag>
                <Tag>
                  {entry.difficulty}({entry.period})
                </Tag>
              </CardBody>
              <CardFooter>
                <Button
                  isLoading={phaseLottery.isLoading}
                  onClick={() => phaseLottery.mutate({ poolCode: entry.poolCode })}
                  variant="ghost"
                  className="custom-button"
                >
                  Lottery
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </SimpleGrid>
      <Box position="relative" h="100px">
        <AbsoluteCenter p="1" axis="both">
          <Button
            variant="solid"
            onClick={() => initPool.mutate()}
            isLoading={initPool.isLoading}
            className="custom-button"
            colorScheme="red"
          >
            Init Lottery System
          </Button>
        </AbsoluteCenter>
      </Box>
    </>
  );
}

export default Admin;
