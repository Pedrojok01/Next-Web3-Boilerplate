"use client";
import { useState } from "react";

import { Box, Button, Flex } from "@chakra-ui/react";

import { Footer, Header, MainPane } from "@/components";
import ExplanationsPage from "@/components/Explanations/Explanations";

export default function Home() {
  // setstate for showexplanations
  const [showExplanations, setShowExplanations] = useState(false);

  return (
    // Declare the variable showExplanations

    <Flex flexDirection="column" minHeight="100vh">
      <Header />

      <Box as="main" flex={1} p={4}>
        <MainPane />
      </Box>

      <Button onClick={() => setShowExplanations(!showExplanations)} mt={4} mx={80}>
        {showExplanations ? "Hide Explanations" : "What is this ?"}
      </Button>

      {showExplanations === true && <ExplanationsPage />}

      <Footer />
    </Flex>
  );
}
