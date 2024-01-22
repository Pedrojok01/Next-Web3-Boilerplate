import React from "react";

import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Image,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import { nanoid } from "nanoid";
import { useAccount } from "wagmi";

import { Difficulty } from "@/server/lib/types";
import { api } from "@/trpc/react";

function PoolList() {
  const { isConnected, address } = useAccount();
  const saveOrUpdate = api.user.saveTickets.useMutation({
    onSuccess: (data) => {
      console.log(data.result);
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const submitted = (poolHash: string) => {
    if (!address || !poolHash) {
      return;
    }
    saveOrUpdate.mutate({
      address,
      poolHash,
      txHash: nanoid(5),
      txTime: new Date().getTime(),
    });
  };

  const { data } = api.pool.poolList.useQuery();
  const records = data?.result as Record<
    string,
    {
      poolHash: string;
      name: string;
      difficulty: Difficulty;
      period: number;
    }
  >;

  const initPool = api.pool.initPool.useMutation({
    onSuccess: (data) => {
      console.log(data.result);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <Stack spacing="4">
      {Object.keys(records ?? {}).map((key) => {
        return (
          <Card
            direction={{ base: "column", sm: "row" }}
            overflow="hidden"
            variant="outline"
            key={key}
          >
            <Image
              objectFit="cover"
              maxW={{ base: "100%", sm: "200px" }}
              src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
              alt="Caffe Latte"
            />

            <CardBody>
              <Stack divider={<StackDivider />} spacing="4">
                <Box>
                  <Heading size="xs" textTransform="uppercase">
                    {records[key].name}
                  </Heading>
                  <Text pt="2" fontSize="sm">
                    {records[key].difficulty}({records[key].period})
                  </Text>
                </Box>
                <Box>
                  <Heading size="xs" textTransform="uppercase">
                    Lottery results
                  </Heading>
                  <Text pt="2" fontSize="sm">
                    Check out the overview of your clients.
                  </Text>
                </Box>
                <Box>
                  <Heading size="xs" textTransform="uppercase">
                    Lottery hits
                  </Heading>
                  <Text pt="2" fontSize="sm">
                    See a detailed analysis of all your business clients.
                  </Text>
                </Box>
              </Stack>
            </CardBody>
            <CardFooter>
              {isConnected ? (<Stack>
                  <Button onClick={() => submitted(key)} variant="solid" colorScheme="blue">
                    Buy Ticket
                  </Button>
                  <Button onClick={() => submitted(key)} variant="solid" colorScheme="red">
                    Lottery
                  </Button>
                  <Button onClick={() => submitted(key)} variant="solid" colorScheme="green">
                    Check Ticket
                  </Button></Stack>
              ) : (
                <Button variant="solid" colorScheme="blue">
                  Connect Wallet
                </Button>
              )}
            </CardFooter>
          </Card>
        );
      })}
      <Divider mb={5} />
      <Button
        mb={5}
        variant="ghost"
        onClick={() => initPool.mutate()}
        isLoading={initPool.isLoading}
        className="custom-button"
      >
        Init Pool
      </Button>
      <Divider mb={5} />
    </Stack>
  );
}

export default PoolList;
