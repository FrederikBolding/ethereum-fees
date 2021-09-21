import React from "react";
import { Flex, Heading, Box } from "@chakra-ui/react";
import { DarkModeToggle } from "./DarkModeToggle";

export const Header = () => (
  <Flex as="nav" justify="space-between" align="center" mb="2">
    <Flex align="center" mr={5}>
      <Heading>Ethereum Fees</Heading>
    </Flex>

    <Box display={{ base: "block", md: "flex" }} right="1rem">
      <DarkModeToggle />
    </Box>
  </Flex>
);
