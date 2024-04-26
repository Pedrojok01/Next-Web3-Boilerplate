"use client";
import { type FC } from "react";

import { Box } from "@chakra-ui/react";
import Link from "next/link";

const Footer: FC = () => {
  return (
    <Box as="footer" p={"1rem"} position="sticky" bottom={0} zIndex={10} textAlign={"center"}>
      <Link
        href="https://github.com/Pedrojok01/Next-Web3-Boilerplate"
        target="_blank"
        rel="noopener noreferrer"
      >
        Don&apos;t forget to leave a ⭐️ on this boilerplate if you like it!
      </Link>
    </Box>
  );
};

export default Footer;
