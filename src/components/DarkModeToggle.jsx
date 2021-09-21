import React from "react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { IconButton, useColorMode } from "@chakra-ui/react";

export const DarkModeToggle = (props) => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <IconButton
      {...props}
      aria-label="Toggle Dark Mode"
      variant="ghost"
      onClick={toggleColorMode}
      icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
    />
  );
};