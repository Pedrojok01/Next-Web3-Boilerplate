import React from "react";

import {
  Box,
  Button,
  Divider,
  Heading,
  Table,
  TableCaption, TableContainer,
  Tbody, Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

import { Difficulty } from "@/server/lib/types";
import { api } from "@/trpc/react";

function Pool() {
  const initPool = api.pool.initPool.useMutation({
    onSuccess: (data) => {
      console.log(data.result);
    },
    onError: (error) => {
      console.log(error);
    },
  });

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
        Pool List
      </Heading>
      <TableContainer>
        <Table variant="striped" colorScheme="teal">
          <TableCaption>Imperial to metric conversion factors</TableCaption>
          <Thead>
            <Tr>
              <Th isNumeric>Index</Th>
              <Th>PoolName</Th>
              <Th>Difficulty</Th>
              <Th>Period</Th>
              <Th>PoolHash</Th>
            </Tr>
          </Thead>
          <Tbody>
            {
              Object.keys(records ?? {}).map((key, index) => {
                return (<Tr key={`pool-${key}`}>
                  <Td isNumeric>{index}</Td>
                  <Td>{records[key].name}</Td>
                  <Td>{records[key].difficulty}</Td>
                  <Td>{records[key].period}</Td>
                  <Td>{key}</Td>
                </Tr>);
              })
            }
          </Tbody>
        </Table>
      </TableContainer>
      <Divider mb={5} />
      <Button mb={5}
              variant="ghost"
              onClick={() => initPool.mutate()}
              isLoading={initPool.isLoading}
              className="custom-button"
      >Init Pool</Button>
      <Divider mb={5} />
    </Box>
  );
}

export default Pool;