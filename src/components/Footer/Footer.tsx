"use client";
import { type FC } from "react";

import { EmailIcon } from "@chakra-ui/icons";
import { Box, Button, VStack, Text, HStack } from "@chakra-ui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { routes } from "@/components/Header/Header";

const Footer: FC = () => {
  const currentPath = usePathname();

  return (
    <Box as="footer" p={"1rem"} position="sticky" bottom={0} zIndex={10} textAlign={"center"}>
      <HStack justifyContent="space-around">
        {routes.map(({ title, path, icon }) => {
          return (
            <Link key={path} href={path}>
              <VStack color={currentPath === path ? "black" : "grey"}>
                {icon}
                <Text>{title}</Text>
              </VStack>
            </Link>
          );
        })}
      </HStack>
    </Box>
  );
};

export default Footer;
