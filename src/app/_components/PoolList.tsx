import React from "react";

import { CheckCircleIcon, CloseIcon } from "@chakra-ui/icons";
import {
  Alert,
  Box,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Icon,
  Image,
  List,
  ListItem,
  Stack,
  StackDivider,
  Tag,
  Text,
} from "@chakra-ui/react";
import { useAccount } from "wagmi";

import CreateTicket from "@/app/_components/CreateTicket";
import { type LotteryPoolProps } from "@/server/lib/LotteryService";
import { api } from "@/trpc/react";
import { cronExpressionToDescription } from "@/utils/cronExpressionToDesc";

function PoolList() {
  const { address } = useAccount();
  const { data } = api.pool.poolList.useQuery();
  const records = data?.result as Array<LotteryPoolProps>;
  console.log(records);
  // const records = [...poolList];
  records?.sort((a, b) => b.name.localeCompare(a.name));

  return (
    <Stack spacing="3">
      <CreateTicket poolList={records} />
      {records?.map((entry) => {
        return (
          <Card
            direction={{ base: "column", sm: "row" }}
            overflow="hidden"
            variant="outline"
            key={entry.poolCode}
          >
            <Image
              objectFit="cover"
              maxW={{ base: "100%", sm: "150px" }}
              src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
              alt="Caffe Latte"
            />

            <CardBody>
              <Stack divider={<StackDivider />} spacing="4">
                <Box>
                  <Heading size="xs" textTransform="uppercase">
                    <Tag>
                      {entry.name}【{entry.poolCode}】
                    </Tag>{" "}
                    <Tag bg="red.200">{entry.difficulty}</Tag>
                  </Heading>

                  <Alert fontSize={"sm"} status={"info"}>
                    ({cronExpressionToDescription(entry.period)})
                  </Alert>
                </Box>
                <Box>
                  <Heading size="xs" textTransform="uppercase">
                    Lottery Current Phase
                  </Heading>
                  <Text pt="2" fontSize="sm">
                    <Tag bg={"blue.500"}> {entry.currentPhase?.slice(-14) ?? "###"}</Tag>
                  </Text>
                </Box>
                <Box>
                  <Heading size="xs" textTransform="uppercase">
                    Lottery Last Results
                  </Heading>
                  <List spacing={2} pt="2">
                    <ListItem>
                      {entry.lastResult?.lotteryResult && (
                        <Tag>
                          ({entry.lastPhase?.slice(-14) ?? "###"}) (
                          {entry.lastResult?.lotteryResult})
                        </Tag>
                      )}
                    </ListItem>
                    <ListItem>
                      {entry.lastResult?.hitAddr && (
                        <Tag color="green.700">
                          {entry.lastResult?.hitAddr ?? "#############"}#
                          {entry.lastResult?.hitTicket ?? "###"}
                        </Tag>
                      )}
                    </ListItem>
                    <ListItem>
                      {entry.lastResult?.hitAddr == address ? (
                        <Icon as={CheckCircleIcon} w={8} h={8} color="green.500" />
                      ) : (
                        <Icon as={CloseIcon} w={8} h={8} color="red.500" />
                      )}
                    </ListItem>
                  </List>
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
