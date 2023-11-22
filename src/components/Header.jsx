// Header.jsx
import React from "react";
import { Heading, Flex } from "@chakra-ui/react";

const Header = () => {
  return (
    <Flex
      as="nev"
      aling="center"
      justify="space-between"
      wrap="wrap"
      paddingY="lrem"
      paddingX="lrem"
      bg="twitter.500"
      color="white"
      boxShadow="0px 2px 4px rgba(0,0,0,0,2"
    >
      <Flex aling="center" mr={5}>
        <Heading as="h2" size="lg" fontWeight="bold">
          Autos Deportivos
        </Heading>
      </Flex>
    </Flex>
  );
};

export default Header;
