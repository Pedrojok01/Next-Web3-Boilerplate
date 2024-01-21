import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";

const mockData = [
  {
    round: 1,
    ticketHash: "0x1234567890",
    status: "Win",
  },
  {
    round: 1,
    ticketHash: "0x31234567890",
    status: "Closed",
  },
];
export const TicketTable: React.FC = () => {
  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>#</Th>
            <Th>Ticket Hash</Th>
            <Th isNumeric>Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          {mockData.map((data) => {
            return (
              <Tr key={data.ticketHash}>
                <Td>{data.round}</Td>
                <Td>{data.ticketHash}</Td>
                <Td isNumeric>{data.status}</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
