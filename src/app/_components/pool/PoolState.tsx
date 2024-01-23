import React from "react";

import { CheckCircleIcon, CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Heading,
  Icon,
  List,
  ListItem,
  Stat,
  StatArrow,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
  Tag,
} from "@chakra-ui/react";
import { useAccount } from "wagmi";

import Countdown from "@/app/_components/Countdown";
import { nextTime } from "@/app/_util/util";
import type { PhaseResult, PoolType } from "@/server/lib/LotteryService";

function PoolState(props: { title: string; pool: PoolType; phaseResult: PhaseResult | undefined }) {
  const { address } = useAccount();
  const { title, pool, phaseResult } = props;

  return (
    <>
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
      <Box>
        <List spacing={2} pt="2">
          <ListItem>
            {phaseResult && (
              <Tag>
                ({phaseResult.currentPhase?.slice(-14) ?? "###"}) ({phaseResult?.lotteryResult})
              </Tag>
            )}
          </ListItem>
          {phaseResult?.lotteryResult ? (
            <>
              <ListItem>
                {phaseResult?.hitAddr && (
                  <Tag color="green.700">
                    {phaseResult?.hitAddr ?? "#############"}#{phaseResult?.hitTicket ?? "###"}
                  </Tag>
                )}
              </ListItem>
              <ListItem>
                {phaseResult?.hitAddr == address ? (
                  <Icon as={CheckCircleIcon} w={8} h={8} color="green.500" />
                ) : (
                  <Icon as={CloseIcon} w={8} h={8} color="red.500" />
                )}
              </ListItem>
            </>
          ) : (
            <Countdown targetDate={nextTime(pool.period)} />
          )}
        </List>
        <Heading size="xs" textTransform="uppercase">
          Lottery {title} Results
        </Heading>
      </Box>
    </>
  );
}

export default PoolState;
