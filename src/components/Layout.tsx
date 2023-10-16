// components/Layout.tsx
import { ReactNode, type FC } from "react";

import { Box, Flex, HStack, Heading } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import Link from "next/link";
import logo from "public/img/logo_transparent.png";

type LayoutProps = {
  children: ReactNode;
};

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <Flex flexDirection="column" minHeight="100vh">
      <HStack
        as="header"
        p={"1.5rem"}
        position="sticky"
        top={0}
        zIndex={10}
        justifyContent={"space-between"}
      >
        <HStack>
          <Image src={logo.src} alt="logo" width={40} height={40} />
          <Heading as="h1">Next-Web3-Boilerplate</Heading>{" "}
        </HStack>
        <ConnectButton />
      </HStack>

      <Box as="main" flex="1" p={4}>
        {children}
      </Box>

      <Box as="footer" p={"1rem"} position="sticky" bottom={0} zIndex={10} textAlign={"center"}>
        Please, leave a ⭐️ on this{" "}
        <Link
          href="https://github.com/Pedrojok01/Next-Web3-Boilerplate"
          target="_blank"
          rel="noopener noreferrer"
        >
          boilerplate
        </Link>{" "}
        if you like it!
      </Box>
    </Flex>
  );
};

export default Layout;
