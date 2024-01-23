import React from "react";

import {
  Box,
  Divider,
  Heading,
  Stat,
  StatHelpText,
  StatNumber,
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

import { nextTime } from "@/app/_util/util";
import type { TicketType } from "@/server/lib/LotteryService";
import { api } from "@/trpc/react";

import Countdown from "../Countdown";

function MyRaffles() {
  const { address } = useAccount();

  const { data } = api.user.ticketsList.useQuery({ address: address ?? "alec-test-address" });
  const records = data?.result as Record<string, TicketType>;
  const tickets = Object.values(records ?? {});
  tickets?.sort((a, b) => a.txTime - b.txTime);

  return (
    <Box>
      <Heading as="h2" fontSize={"1.5rem"} mb={10} className="text-shadow">
        My Raffles List
      </Heading>
      <TableContainer>
        <Table variant="striped">
          <TableCaption>Imperial to metric conversion factors</TableCaption>
          <Thead>
            <Tr>
              <Th>Phase</Th>
              <Th>Bet</Th>
              <Th>Prize Pool</Th>
              <Th>Result</Th>
            </Tr>
          </Thead>
          <Tbody>
            {Object.keys(records ?? {}).map((key) => {
              return (
                <Tr key={`ticket-${key}`}>
                  <Td>{records[key].currentPhase?.slice(-14)}</Td>
                  <Td>{records[key].tickets.length * 0.001}ETH</Td>
                  <Td>
                    <Stat>
                      <StatNumber>1231.23 ETH</StatNumber>
                      <StatHelpText>Feb 12 - Feb 28</StatHelpText>
                    </Stat>
                  </Td>
                  <Td>
                    <Countdown targetDate={nextTime("*/30 * * * * *")} />
                  </Td>
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

export default MyRaffles;
