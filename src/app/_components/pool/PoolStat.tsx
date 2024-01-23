import React from "react";

import { Stat, StatArrow, StatGroup, StatHelpText, StatLabel, StatNumber } from "@chakra-ui/react";

function PoolStat(props: { poolCode: string }) {
  const { poolCode } = props;
  console.log("TODO PoolStat", poolCode);
  return (
    <StatGroup>
      <Stat>
        <StatLabel>Collected Fees</StatLabel>
        <StatNumber>£345,670</StatNumber>
        <StatHelpText>
          <StatArrow type="increase" />
          23.36%
        </StatHelpText>
      </Stat>
      <Stat>
        <StatLabel>Tickets Count</StatLabel>
        <StatNumber>45</StatNumber>
        <StatHelpText>
          <StatArrow type="decrease" />
          9.05%
        </StatHelpText>
      </Stat>
      <Stat>
        <StatLabel>Clicked</StatLabel>
        <StatNumber>45</StatNumber>
        <StatHelpText>
          <StatArrow type="decrease" />
          9.05%
        </StatHelpText>
      </Stat>
    </StatGroup>
  );
}

export default PoolStat;
