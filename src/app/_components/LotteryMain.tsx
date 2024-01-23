import React from "react";

import { TabList, TabPanel, TabPanels } from "@chakra-ui/react";
import { Tab, Tabs } from "@chakra-ui/tabs";

import Admin from "@/app/_components/admin/Admin";
import Airdrop from "@/app/_components/airdrop/Airdrop";
import PoolList from "@/app/_components/pool/PoolList";
import MyRaffles from "@/app/_components/raffle/MyRaffles";
import MyTickets from "@/app/_components/ticket/MyTickets";

function LotteryMain() {
  return (
    <Tabs>
      <TabList>
        <Tab>Pool List</Tab>
        <Tab>My Tickets</Tab>
        <Tab>My Raffles</Tab>
        <Tab>Airdrop</Tab>
        <Tab>Admin</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <PoolList />
        </TabPanel>
        <TabPanel>
          <MyTickets />
        </TabPanel>
        <TabPanel>
          <MyRaffles />
        </TabPanel>
        <TabPanel>
          <Airdrop />
        </TabPanel>
        <TabPanel>
          <Admin />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default LotteryMain;
