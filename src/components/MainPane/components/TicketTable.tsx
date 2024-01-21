import {
  Box,
  Heading,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import Countdown, { zeroPad } from "react-countdown";
const unixTimeEndOfDay = Math.floor(
  new Date(new Date().toUTCString().substring(0, 25)).setHours(23, 59, 59, 999),
);

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
        <TableCaption>Imperial to metric conversion factors</TableCaption>
        <Thead>
          <Tr>
            <Th>#</Th>
            <Th>Ticket Hash</Th>
            <Th isNumeric>Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          {/* <Tr>
            <Td>inches</Td>
            <Td>millimetres (mm)</Td>
            <Td isNumeric>25.4</Td>
          </Tr> */}
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
