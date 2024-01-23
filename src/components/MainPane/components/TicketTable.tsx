import { Flex, Table, TableContainer, Tag, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useAccount } from "wagmi";

import type { PoolStateType, PoolType, TicketType } from "@/server/lib/LotteryService";
import { api } from "@/trpc/react";

export const TicketTable: React.FC = () => {
  const { address } = useAccount();

  const { data } = api.user.ticketsList.useQuery(
    { address: address as string },
    { enabled: !!address },
  );
  const { data: poolData } = api.pool.poolStateList.useQuery();
  const pools = poolData?.result as Array<PoolStateType>;

  const records = data?.result as Record<string, TicketType>;
  const tickets = Object.values(records ?? {});
  tickets?.sort((a, b) => a.txTime - b.txTime);
  console.log(tickets, pools);
  const poolDetails = pools?.reduce(
    (acc, pool) => {
      acc[pool.pool.poolCode] = pool.pool;
      return acc;
    },
    {} as Record<string, PoolType>,
  );

  console.log(poolDetails);
  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Phase</Th>
            <Th>Ticket Hash</Th>
            <Th>Pool</Th>
            <Th isNumeric>Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          {poolDetails &&
            tickets.map((ticket) => {
              return (
                <Tr key={ticket.txHash}>
                  <Td>{ticket.currentPhase}</Td>
                  <Td>
                    <Flex flexWrap="wrap" gap={3}>
                      {ticket.tickets.map((ticket) => (
                        <Tag key={ticket}>{ticket}</Tag>
                      ))}
                    </Flex>
                  </Td>
                  <Td>{poolDetails[ticket.poolCode]?.name}</Td>
                  <Td isNumeric>status</Td>
                </Tr>
              );
            })}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
