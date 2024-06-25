import { Box, Text, Heading, useColorMode } from "@chakra-ui/react";

const InitialThesis = () => {
  const { colorMode } = useColorMode();
  return (
    <Box p={5} my={10} bg={colorMode === "light" ? "whiteAlpha.400" : "blackAlpha.50"} borderRadius="md" boxShadow="md">
      <Heading as="h2" size="xl" mb={5}>
        Initial Thesis
      </Heading>
      <Text>
        In 2023, rug pulls resulted in $1.7 billion being stolen from investors.
      </Text>
      <Text mt={3}>
        Presales are increasingly riddled with scams, false promises, and market manipulation. Malicious founders also frequently sell their tokens, on the back of regular investors. Many projects inflate their trading volumes through wash trading to appear more attractive and rank higher on decentralized exchanges.
      </Text>
      <Text mt={3}>
        These deceptions and scams severely damage DeFi’s reputation, leading to widespread distrust and consistently disadvantaging regular investors. This must change.
      </Text>
      <Text mt={3}>
        A trustworthy and transparent crypto environment is essential for mass adoption. It’s time for a new era in DeFi — one that is transparent, safe, and fair for everyone.
      </Text>
    </Box>
  );
};

export default InitialThesis;
