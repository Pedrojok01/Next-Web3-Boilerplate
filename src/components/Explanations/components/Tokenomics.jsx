import { Box, Text, Heading, UnorderedList, ListItem, useColorMode } from "@chakra-ui/react";

const Tokenomics = () => {
  const { colorMode } = useColorMode();
  return (
   
    <Box p={5} my={10} bg={colorMode === "light" ? "whiteAlpha.400" : "blackAlpha.50"} borderRadius="md" boxShadow="md">
      <Heading as="h2" size="xl" mb={5}>
        AIR — Tokenomics & Parameters
      </Heading>

      <Heading as="h3" size="lg" mb={3}>
        Supply Parameters
      </Heading>
      <Text>The initial token supply at level 1 is 1,000,000 tokens.</Text>
      <Text mt={3}>
        As the levels increase, the distribution of the token supply is as follows:
      </Text>
      <UnorderedList mt={3}>
        <ListItem>
          Level 1: 1,000,000 tokens
        </ListItem>
        <ListItem>
          Level 2: 900,000 tokens
        </ListItem>
        <ListItem>
          Level 3: 810 000 tokens
        </ListItem>
        <ListItem>
          Level 4: 729 000 tokens
        </ListItem>
      </UnorderedList>

      <Heading as="h3" size="lg" mt={5} mb={3}>
        Price Parameters
      </Heading>
      <Text>
        Initial token price at level 1: 0.000006250 ETH
      </Text>
      <Text mt={3}>
        As the levels increase, the price of the token is as follows:
      </Text>
      <UnorderedList mt={3}>
        <ListItem>Level 1: 0,000006250 ETH</ListItem>
        <ListItem>Level 2: 0,000008125 ETH</ListItem>
        <ListItem>Level 3: 0,00001373125 ETH</ListItem>
        <ListItem>Level 4: 0,00003016755625 ETH</ListItem>
        <ListItem>Level 5: 0,000086161557405625 ETH</ListItem>
      </UnorderedList>

      <Heading as="h3" size="lg" mt={5} mb={3}>
        Transaction Fee Structure for $AIR
      </Heading>
      <Text>
        Whether purchasing $AIR (by sending ETH to the contract) or selling $AIR (by sending $AIR to the contract), transactions are subject to a 1% fee.
      </Text>
      
    </Box>)};export default Tokenomics;
