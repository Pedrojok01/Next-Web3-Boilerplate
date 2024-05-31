import { Box, Text, Heading, Link } from "@chakra-ui/react";

const LegalDisclaimer = () => {
  return (
    <Box p={5} bg="gray.100" borderRadius="md">
      <Heading as="h3" size="lg" mb={3}>
        Legal Disclaimer
      </Heading>
      <Text>
        Please read the entirety of the “legal disclaimer” section available at the end of this document carefully, nothing herein constitutes legal, financial, business or tax advice and you are strongly advised to consult your own legal, financial, tax or other professional advisor(s) before engaging in any activity in connection herewith. Neither AIR (the company), any distributor and/or vendor of AIR tokens (or such other re-named or successor ticker code or name of such tokens) (the distributor), nor any service provider shall be liable for any kind of direct or indirect damage or loss whatsoever which you may suffer in connection with accessing the paper, deck or material relating to AIR and the AIR ecosystem (the documentation) available on the website at <Link href="https://www.(coming-soon)">https://www.(coming-soon)</Link> or any materials published on social platforms (including but not limited to X, Reddit, Medium and Telegram) or any materials communicated by the company or its representatives from time to time.
      </Text>
    </Box>
  );
};

export default LegalDisclaimer;
