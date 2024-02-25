"use client";
import { type FC } from "react";

import { HStack, Heading } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";

import { useWindowSize } from "@/hooks/useWindowSize";

import logo from "../../../public/img/logo_transparent.png";
import { DarkModeButton } from "../DarkModeButton";

const Header: FC = () => {
  const { isTablet } = useWindowSize();

  return (
    <HStack
      as="header"
      p={"1.5rem"}
      position="sticky"
      top={0}
      zIndex={10}
      justifyContent={"space-between"}
    >
      <HStack>
        <Image src={logo.src} alt="logo" width={45} height={45} />
        {!isTablet && (
          <Heading as="h1" fontSize={"1.5rem"} className="text-shadow">
            Next-Web3-Boilerplate
          </Heading>
        )}
      </HStack>

      <HStack>
        <ConnectButton />
        <DarkModeButton />
      </HStack>
    </HStack>
  );
};

export default Header;
