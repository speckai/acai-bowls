"use client";

import { useState } from 'react';
import {
  Box,
  Input,
  VStack,
  Heading,
  SimpleGrid,
  Text,
  InputGroup,
  InputLeftElement,
  Card,
  CardHeader,
  CardBody,
  Stack,
  Container,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import LocationMap from '../components/LocationMap';

// Sample location data
const sampleLocations = [
  {
    id: 1,
    name: "Acai Paradise",
    address: "123 Sunset Boulevard",
    city: "Los Angeles",
    state: "CA",
    zipCode: "90028",
    hours: "9:00 AM - 8:00 PM",
    phone: "(323) 555-0123"
  },
  {
    id: 2,
    name: "Bowl Heaven",
    address: "456 Venice Beach Drive",
    city: "Venice",
    state: "CA",
    zipCode: "90291",
    hours: "8:00 AM - 7:00 PM",
    phone: "(310) 555-0124"
  },
  {
    id: 3,
    name: "Tropical Acai Bar",
    address: "789 Santa Monica Blvd",
    city: "Santa Monica",
    state: "CA",
    zipCode: "90401",
    hours: "7:00 AM - 9:00 PM",
    phone: "(310) 555-0125"
  },
  {
    id: 4,
    name: "Fresh Bowl Co.",
    address: "321 Beverly Drive",
    city: "Beverly Hills",
    state: "CA",
    zipCode: "90210",
    hours: "8:30 AM - 7:30 PM",
    phone: "(310) 555-0126"
  }
];

export default function LocationsPage() {
  const [searchZip, setSearchZip] = useState('');
  const [filteredLocations, setFilteredLocations] = useState(sampleLocations);

  const handleSearch = (value: string) => {
    setSearchZip(value);
    if (value.trim() === '') {
      setFilteredLocations(sampleLocations);
    } else {
      const filtered = sampleLocations.filter(location => 
        location.zipCode.includes(value)
      );
      setFilteredLocations(filtered);
    }
  };

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        <Box>
          <Heading as="h1" size="xl" mb={6} textAlign="center">
            Find Acai Bowl Locations
          </Heading>
          <InputGroup size="lg" maxW="600px" mx="auto">
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.300" />
            </InputLeftElement>
            <Input
              placeholder="Enter ZIP code"
              value={searchZip}
              onChange={(e) => handleSearch(e.target.value)}
              borderColor="purple.200"
              _hover={{ borderColor: 'purple.300' }}
              _focus={{ borderColor: 'purple.500', boxShadow: '0 0 0 1px var(--chakra-colors-purple-500)' }}
            />
          </InputGroup>
        </Box>

        <Box>
          <Heading as="h2" size="lg" mb={4}>
            Available Locations
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            {filteredLocations.map((location) => (
              <Card 
                key={location.id}
                borderRadius="lg"
                overflow="hidden"
                boxShadow="md"
                borderColor="purple.100"
                borderWidth="1px"
                _hover={{ 
                  transform: 'translateY(-2px)',
                  boxShadow: 'lg',
                  transition: 'all 0.2s ease-in-out'
                }}
              >
                <CardHeader bg="purple.50" py={4}>
                  <Heading size="md" color="purple.700">
                    {location.name}
                  </Heading>
                </CardHeader>
                <CardBody>
                  <Stack spacing={2}>
                    <Text>
                      {location.address}
                      <br />
                      {location.city}, {location.state} {location.zipCode}
                    </Text>
                    <Text><strong>Hours:</strong> {location.hours}</Text>
                    <Text><strong>Phone:</strong> {location.phone}</Text>
                  </Stack>
                </CardBody>
              </Card>
            ))}
          </SimpleGrid>
        </Box>

        <Box>
          <Heading as="h2" size="lg" mb={4}>
            Location Map
          </Heading>
          <LocationMap />
        </Box>
      </VStack>
    </Container>
  );
}