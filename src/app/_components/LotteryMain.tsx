import React from "react";

import { TabList, TabPanel, TabPanels } from "@chakra-ui/react";
import { Tab, Tabs } from "@chakra-ui/tabs";

import Admin from "@/app/_components/Admin";
import MyTickets from "@/app/_components/MyTickets";
import PoolList from "@/app/_components/PoolList";
import Referral from "@/app/_components/Referral";

function LotteryMain() {
  return (
    <Tabs>
      <TabList>
        <Tab>Lottery Pool</Tab>
        <Tab>My Tickets</Tab>
        <Tab>Referral</Tab>
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
          <Referral />
        </TabPanel>
        <TabPanel>
          <Admin />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default LotteryMain;
