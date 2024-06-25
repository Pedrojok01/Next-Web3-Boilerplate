"use client";
import { useState } from "react";

import { Box, Button, Flex, useColorMode } from "@chakra-ui/react";

import { Footer, Header, MainPane } from "@/components";
import ExplanationsPage from "@/components/Explanations/Explanations";

export default function Home() {
  // setstate for showexplanations
  const [showExplanations, setShowExplanations] = useState(false);
  const { colorMode } = useColorMode();

  return (
    // Declare the variable showExplanations

    <Flex flexDirection="column" minHeight="100vh">
      <Header />

      <Box as="main" flex={1} p={4}>
        <MainPane />
      </Box>

      <Button
        onClick={() => setShowExplanations(!showExplanations)}
        mt={4}
        width={["100%", "auto"]}
        alignSelf="center"
        bgColor={colorMode == "light" ? "whiteAlpha.400" : "blackAlpha.50"}
        color={colorMode === "light" ? "black" : "white"}
        fontSize="larger"
      >
        {showExplanations ? "Hide Explanations" : "What is this ?"}
      </Button>

      {showExplanations === true && <ExplanationsPage />}

      <Footer />
    </Flex>
  );
}
