import React, { useState } from "react";

import {
  Box, Button, Divider, Table,
  Thead,
  Tbody,
  Select,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer, Heading, Flex,
} from "@chakra-ui/react";
import { nanoid } from "nanoid";
import { useAccount } from "wagmi";

import { Difficulty } from "@/server/lib/types";
import { api } from "@/trpc/react";

function Ticket() {
  const { isConnected, address } = useAccount();

  const [poolHash, setPoolHash] = useState<string>();

  console.log(poolHash);

  const saveOrUpdate = api.user.saveTickets.useMutation({
    onSuccess: (data) => {
      console.log(data.result);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const { data } = api.user.ticketsList.useQuery({ address: address ?? "alec-test-address" });
  const records = data?.result as Record<string, { data: Array<string> }>;

  const { data: poolData } = api.pool.poolList.useQuery();
  const poolRecords = poolData?.result as Record<string, {
    poolHash: string
    name: string,
    difficulty: Difficulty,
    period: number
  }>;

  const submitted = () => {
    if (!address || !poolHash) {
      return;
    }
    saveOrUpdate.mutate({
        address,
        poolHash,
        txHash: nanoid(5),
        txTime: new Date().getTime(),
      },
    );
  };

  return (
    <Box>
      <Heading as="h2" fontSize={"1.5rem"} mb={10} className="text-shadow">
        Ticket List
      </Heading>
      <TableContainer>
        <Table variant="striped" colorScheme="teal">
          <TableCaption>Imperial to metric conversion factors</TableCaption>
          <Thead>
            <Tr>
              <Th isNumeric>Index</Th>
              <Th>TxHash</Th>
              <Th>Tickets</Th>
            </Tr>
          </Thead>
          <Tbody>
            {
              Object.keys(records ?? {}).map((key, index) => {
                return (<Tr key={`ticket-${key}`}>
                  <Td isNumeric>{index}</Td>
                  <Td>{key}</Td>
                  <Td>{JSON.stringify(records[key].data)}</Td>
                </Tr>);
              })
            }
          </Tbody>
        </Table>
      </TableContainer>
      <Divider mb={5} />
      <Flex>
        <Select placeholder="Select One Pool" onChange={(_) => setPoolHash(_.target.value)}>
          {
            Object.keys(poolRecords ?? {}).map((key) => {
              return (<option key={`op-${key}`} value={key}>{poolRecords[key].name}</option>);
            })
          }
        </Select>{isConnected &&
        <Button mb={5}
                variant="ghost"
                onClick={submitted}
                isLoading={saveOrUpdate.isLoading}
                className="custom-button"
        >Buy Ticket</Button>
      }
      </Flex>
      <Divider mb={5} />
    </Box>
  );
}

export default Ticket;