import { Box, Text, Heading, ListItem, UnorderedList, useColorMode } from "@chakra-ui/react";

const TokenDesign = () => {
  const { colorMode } = useColorMode();
  return (
    <Box p={5} my={10} bg={colorMode === "light" ? "whiteAlpha.400" : "blackAlpha.50"} borderRadius="md" boxShadow="md">
      <Heading as="h2" size="xl" mb={5}>
        ERC-1919: Fair & Safe By Design
      </Heading>
      <Heading as="h3" size="lg" mb={3}>
        Concept
      </Heading>
      <Text>
        To address the pervasive issue of malicious actors and the potential for manipulation in token trading, we propose a transformative approach to token trading and exchange protocols. Despite the best intentions, it is impossible to completely trust any team to avoid manipulation or scams. Therefore, the solution lies in fundamentally altering the trading mechanism to eliminate the possibility of fraud.
      </Text>
      <Text mt={3}>
        Our vision is an immutable, ultra-transparent, and unruggable protocol designed to ensure safe and fair token exchanges. This new kind of token protocol prevents scams, market manipulation, and the pitfalls of presales and venture capital investments, thereby fostering a more trustworthy trading environment.
      </Text>
      <Text mt={3}>
        Introducing ERC-1919, a groundbreaking successor to ERC-20 and ERC-404, engineered to bring unparalleled transparency and security to the masses. This protocol is poised to revolutionize the token trading landscape by ensuring that safety and fairness are embedded by design.
      </Text>

      <Heading as="h3" size="lg" mt={5} mb={3}>
        Trading via Smart Contract Only
      </Heading>
      <Text>
        With ERC-1919, token trading is exclusively conducted through smart contracts, eliminating the need for decentralized exchanges (DEX) or liquidity pools (LP).
      </Text>
      <UnorderedList mt={3}>
        <ListItem>
          <Text>
            Mint mechanism: When tokens are bought (by sending the native blockchain token to the contract), they are minted on the contract and then sent to the user.
          </Text>
        </ListItem>
        <ListItem>
          <Text>
            Redeem mechanism: When tokens are sold (by sending project-specific tokens to the contract), the tokens are burned to reclaim their equivalent value in the native blockchain token, which is then sent to the user.
          </Text>
        </ListItem>
      </UnorderedList>

      <Heading as="h3" size="lg" mt={5} mb={3}>
        Algorithmic Pricing
      </Heading>
      <Text>
        Token prices are usually determined by a simple formula, using the value of the two tokens present in the liquidity pool:
      </Text>
      <Text mt={3}>
        To address the absence of a liquidity pool with ERC1919, we devised a novel method to calculate the token price fairly and transparently through a mechanism we call “price levels.”
      </Text>
      <Text mt={3}>
        How Price Levels Work
      </Text>
      <Text mt={3}>
        Levels can fluctuate:
      </Text>
      <UnorderedList mt={3}>
        <ListItem>Upwards: When tokens are minted.</ListItem>
        <ListItem>Downwards: When tokens are redeemed.</ListItem>
      </UnorderedList>
      <Text mt={3}>
        Key Characteristics of Price Levels
      </Text>
      <UnorderedList mt={3}>
        <ListItem>Each level has a predefined supply of tokens.</ListItem>
        <ListItem>Each level is associated with a specific price point. As levels increase, the price per token rises; as levels decrease, the price per token falls.</ListItem>
        <ListItem>There is no limit to the number of price levels a token can reach.</ListItem>
      </UnorderedList>
    </Box>
  );
};

export default TokenDesign;
