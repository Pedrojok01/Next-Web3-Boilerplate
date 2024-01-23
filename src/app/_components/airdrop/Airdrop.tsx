import React from "react";

import { CheckCircleIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  Flex,
  Heading,
  IconButton,
  Text,
} from "@chakra-ui/react";

import Qr from "@/app/_components/Qr";

function Airdrop() {
  return (
    <Card maxW="md">
      <CardHeader>
        <Flex>
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            <Avatar name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />

            <Box>
              <Heading size="sm">Segun Adebayo</Heading>
              <Text>Creator, Chakra UI</Text>
            </Box>
          </Flex>
          <IconButton
            variant="ghost"
            colorScheme="gray"
            aria-label="See menu"
            icon={<CheckCircleIcon />}
          />
        </Flex>
      </CardHeader>
      <CardBody>
        <Text>
          With Chakra UI, I wanted to sync the speed of development with the speed of design. I
          wanted the developer to be just as excited as the designer to create a screen.
        </Text>
      </CardBody>
      <Center>
        <Qr />
      </Center>

      <CardFooter
        justify="space-between"
        flexWrap="wrap"
        sx={{
          "& > button": {
            minW: "136px",
          },
        }}
      >
        <Button flex="1" variant="ghost" leftIcon={<CheckCircleIcon />}>
          Like
        </Button>
        <Button flex="1" variant="ghost" leftIcon={<CheckCircleIcon />}>
          Comment
        </Button>
        <Button flex="1" variant="ghost" leftIcon={<CheckCircleIcon />}>
          Share
        </Button>
      </CardFooter>
    </Card>
  );
}

export default Airdrop;
