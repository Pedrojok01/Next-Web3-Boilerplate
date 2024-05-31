import React from "react";

import { Heading } from "@chakra-ui/react";

import InitialThesis from "./components/initialThesis";
import LegalDisclaimer from "./components/legalDisclaimer";
import TokenDesign from "./components/TokenDesign";
import Tokenomics from "./components/Tokenomics";

const ExplanationsPage: React.FC = () => {
  return (
    <div>
      <Heading as="h2" fontSize={"2rem"} className="text-shadow">
        Explanations
      </Heading>
      <InitialThesis />
      <LegalDisclaimer />
      <TokenDesign />
      <Tokenomics />
    </div>
  );
};

export default ExplanationsPage;
