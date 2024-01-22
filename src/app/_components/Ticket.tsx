import React from "react";

import {
  Box,
  Divider,
  Heading,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useAccount } from "wagmi";

import { api } from "@/trpc/react";

function Ticket() {
  const { address } = useAccount();

  const { data } = api.user.ticketsList.useQuery({ address: address ?? "alec-test-address" });
  const records = data?.result as Record<string, { poolHash: string, txTime: number, data: Array<string> }>;

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
              <Th>Pool</Th>
              <Th>TxTime</Th>
            </Tr>
          </Thead>
          <Tbody>
            {Object.keys(records ?? {}).map((key, index) => {
              return (
                <Tr key={`ticket-${key}`}>
                  <Td isNumeric>{index}</Td>
                  <Td>{key}</Td>
                  <Td>{JSON.stringify(records[key].data)}</Td>
                  <Td>{records[key].poolHash}</Td>
                  <Td>{records[key].txTime}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
      <Divider mb={5} />
    </Box>
  );
}

export default Ticket;
