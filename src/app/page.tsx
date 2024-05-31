"use client";
import { Box, Button, Flex } from "@chakra-ui/react";

import { Footer, Header, MainPane } from "@/components";
import ExplanationsPage from "@/components/Explanations/Explanations";

export default function Home() {
  const showExplanations = false;
  return (
    // Declare the variable showExplanations

    <Flex flexDirection="column" minHeight="100vh">
      <Header />

      <Box as="main" flex={1} p={4}>
        <MainPane />
      </Box>

      {showExplanations && <ExplanationsPage />}

      <Button onClick={() => !showExplanations} mt={4}>
        {showExplanations ? "Hide Explanation" : "Show Explanation"}
      </Button>

      <Footer />
    </Flex>
  );
}
