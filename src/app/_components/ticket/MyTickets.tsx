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
import moment from "moment";
import { useAccount } from "wagmi";

import type { TicketType } from "@/server/lib/LotteryService";
import { api } from "@/trpc/react";

function MyTickets() {
  const { address } = useAccount();

  const { data } = api.user.ticketsList.useQuery({ address: address ?? "alec-test-address" });
  const records = data?.result as Record<string, TicketType>;
  const tickets = Object.values(records ?? {});
  tickets?.sort((a, b) => a.txTime - b.txTime);

  return (
    <Box>
      <Heading as="h2" fontSize={"1.5rem"} mb={10} className="text-shadow">
        My Ticket List
      </Heading>
      <TableContainer>
        <Table variant="striped">
          <TableCaption>Imperial to metric conversion factors</TableCaption>
          <Thead>
            <Tr>
              <Th isNumeric>Index</Th>
              <Th>Phase</Th>
              <Th>Tickets</Th>
              <Th>TxHash</Th>
              <Th>Pool</Th>
              <Th>TxTime</Th>
            </Tr>
          </Thead>
          <Tbody>
            {Object.keys(records ?? {}).map((key, index) => {
              return (
                <Tr key={`ticket-${key}`}>
                  <Td isNumeric>{index}</Td>
                  <Td>{records[key].currentPhase?.slice(-14)}</Td>
                  <Td>{JSON.stringify(records[key].tickets)}</Td>
                  <Td>{key}</Td>
                  <Td>{records[key].poolCode}</Td>
                  <Td>{moment(records[key].txTime).format("YYYY-MM-DD HH:mm:ss")}</Td>
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

export default MyTickets;
