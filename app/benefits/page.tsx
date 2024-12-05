"use client";

import { Box, Heading, Text, VStack, Container, SimpleGrid } from "@chakra-ui/react";

export default function Benefits() {
  return (
    <Box minH="100vh" py={16} px={8}>
      <Container maxW="container.xl">
        <VStack spacing={12} align="center">
          {/* Hero Section */}
          <Box textAlign="center" w="full">
            <Heading as="h1" size="2xl" mb={6}>
              The Amazing Benefits of Acai Bowls
            </Heading>
            <Text fontSize="xl" maxW="800px" mx="auto" color="gray.600">
              Discover why acai bowls are more than just a delicious treat - they're a powerhouse of nutrition and wellness benefits.
            </Text>
          </Box>

          {/* Benefits Grid */}
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} w="full">
            {/* Antioxidants Section */}
            <Box 
              p={8} 
              bg="white" 
              borderRadius="xl" 
              boxShadow="lg"
              _hover={{ transform: "translateY(-4px)", transition: "all 0.2s ease-in-out" }}
            >
              <Heading as="h3" size="lg" mb={4} color="purple.600">
                Rich in Antioxidants
              </Heading>
              <Text color="gray.600" fontSize="lg">
                Acai berries contain powerful antioxidants that help combat free radicals and oxidative stress. These antioxidants, including anthocyanins, support overall cellular health and may help prevent various diseases.
              </Text>
            </Box>

            {/* Energy Boost Section */}
            <Box 
              p={8} 
              bg="white" 
              borderRadius="xl" 
              boxShadow="lg"
              _hover={{ transform: "translateY(-4px)", transition: "all 0.2s ease-in-out" }}
            >
              <Heading as="h3" size="lg" mb={4} color="purple.600">
                Natural Energy Boost
              </Heading>
              <Text color="gray.600" fontSize="lg">
                Unlike artificial energy drinks, acai bowls provide sustained energy through natural sugars, healthy fats, and complex carbohydrates. Perfect for pre-workout fuel or an afternoon pick-me-up without the crash.
              </Text>
            </Box>

            {/* Overall Health Section */}
            <Box 
              p={8} 
              bg="white" 
              borderRadius="xl" 
              boxShadow="lg"
              _hover={{ transform: "translateY(-4px)", transition: "all 0.2s ease-in-out" }}
            >
              <Heading as="h3" size="lg" mb={4} color="purple.600">
                Complete Nutrition
              </Heading>
              <Text color="gray.600" fontSize="lg">
                Packed with essential vitamins, minerals, and fiber, acai bowls contribute to overall health and wellness. They support immune function, digestive health, and can help maintain healthy skin.
              </Text>
            </Box>
          </SimpleGrid>

          {/* Additional Benefits Section */}
          <Box maxW="800px" textAlign="center" mt={8}>
            <Heading as="h2" size="xl" mb={6} color="purple.700">
              More Than Just a Superfood
            </Heading>
            <Text fontSize="lg" color="gray.600" mb={4}>
              Acai bowls are not just nutritious - they're also incredibly versatile and satisfying. Each bowl can be customized with various toppings like fresh fruits, nuts, and seeds to create a perfect balance of flavors and textures.
            </Text>
            <Text fontSize="lg" color="gray.600">
              Whether you're looking to improve your diet, boost your energy levels, or simply enjoy a delicious and healthy meal, acai bowls are an excellent choice that provides numerous health benefits while satisfying your taste buds.
            </Text>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}