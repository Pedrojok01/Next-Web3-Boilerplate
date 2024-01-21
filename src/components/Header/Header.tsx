"use client";
import { type FC } from "react";

import { EmailIcon } from "@chakra-ui/icons";
import { Button, HStack, Heading } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import logo from "public/img/logo_transparent.png";

import { useWindowSize } from "@/hooks/useWindowSize";

import { DarkModeButton } from "../DarkModeButton";

export const routes = [
  {
    title: "Lottery",
    path: "/",
    icon: <EmailIcon />,
  },
  {
    title: "Ticket",
    path: "/ticket",
    icon: <EmailIcon />,
  },
  {
    title: "Referral",
    path: "/referral",
    icon: <EmailIcon />,
  },
];

const Header: FC = () => {
  const { isTablet } = useWindowSize();
  const path = usePathname();
  const router = useRouter();

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
          <>
            <Heading as="h1" fontSize={"1.5rem"} className="text-shadow">
              PEVL
            </Heading>{" "}
            {routes.map((route) => {
              return (
                <Button
                  key={route.path}
                  variant="ghost"
                  onClick={() => {
                    router.push(route.path);
                  }}
                >
                  {route.title}
                </Button>
              );
            })}
          </>
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
