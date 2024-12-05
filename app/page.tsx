"use client";

import { Box, Heading, Text, VStack, Button } from "@chakra-ui/react";
import Link from "next/link";
import LocationMap from "./components/LocationMap";

export default function Home() {
  return (
    <Box minH="100vh" py={16} px={8}>
      <VStack spacing={8} align="center">
        <Heading as="h1" size="2xl" textAlign="center">
          Discover the Benefits of Acai Bowls
        </Heading>
        <Text fontSize="lg" textAlign="center" maxW="600px">
          Acai bowls are packed with antioxidants, provide a great energy boost, and offer numerous health benefits. Enjoy a delicious and nutritious treat that supports your well-being.
        </Text>
        <Heading as="h2" size="lg" textAlign="center" mt={8}>
          Find Acai Bowls Near You
        </Heading>
        <Box w="full" h="500px">
          <LocationMap />
        </Box>
        <Link href="/locations" passHref>
          <Button as="a" size="lg" colorScheme="purple" mt={4}>
            Find Locations
          </Button>
        </Link>
      </VStack>
    </Box>
  );
}