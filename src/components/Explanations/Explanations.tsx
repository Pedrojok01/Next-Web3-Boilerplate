import React from "react";

import { Box, Heading } from "@chakra-ui/react";

import InitialThesis from "./components/initialThesis";
// import LegalDisclaimer from "./components/legalDisclaimer";
import TokenDesign from "./components/TokenDesign";
import Tokenomics from "./components/Tokenomics";

const ExplanationsPage: React.FC = () => {
  return (
    <Box px={20}>
      <Heading as="h2" fontSize={"3rem"} className="text-shadow" my={10}>
        Explanations
      </Heading>
      <InitialThesis />
      {/* <LegalDisclaimer /> */}
      <TokenDesign />
      <Tokenomics />
    </Box>
  );
};

export default ExplanationsPage;
