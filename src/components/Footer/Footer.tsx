"use client";

import type { FC } from "react";

import { Box, Text, Link } from "@chakra-ui/react";

const Footer: FC = () => {
  return (
    <Box
      as="footer"
      p="1rem"
      position="sticky"
      bottom={0}
      zIndex={10}
      textAlign="center"
      backgroundColor="gray.800"
      color="white"
      borderRadius={10}
      margin={10}
    >
      <Text fontSize="sm" mb="0.5rem">
        © 2024 Your Dapp Name. All rights reserved.
      </Text>
      <Text fontSize="sm" mb="0.5rem">
        Powered by{" "}
        <Link href="https://web3js.readthedocs.io/" isExternal color="blue.500">
          Web3.js
        </Link>{" "}
        and{" "}
        <Link href="https://chakra-ui.com/" isExternal color="blue.500">
          Chakra UI
        </Link>
        .
      </Text>
      <Text fontSize="sm">
        Connect with us:{" "}
        <Link href="https://twitter.com/yourdapp" isExternal color="blue.500">
          @yourdapp
        </Link>
      </Text>
    </Box>
  );
};

export default Footer;
