"use client";

import { type FC } from "react";

import { IconButton } from "@chakra-ui/react";
import { LuMoon, LuSun } from "react-icons/lu";

import { useColorMode } from "@/hooks";

const DarkModeButton: FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      onClick={toggleColorMode}
      variant="ghost"
      aria-label="Toggle color mode"
      w="40px"
      h="40px"
      className="custom-button"
      css={{ _icon: { width: "5", height: "5" } }}
    >
      {colorMode === "dark" ? <LuMoon /> : <LuSun />}
    </IconButton>
  );
};

export default DarkModeButton;
