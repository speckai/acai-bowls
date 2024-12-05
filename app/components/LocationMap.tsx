"use client";

import { useEffect, useState } from 'react';
import { Box, Spinner, Text, useToast } from '@chakra-ui/react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

// Define the container style for the map
const containerStyle = {
  width: '100%',
  height: '500px'
};

// Sample locations to show nearby (will be offset from a central point based on zip code)
const SAMPLE_OFFSETS = [
  { lat: 0.01, lng: 0.01, name: "Acai Paradise" },
  { lat: -0.008, lng: 0.005, name: "Bowl Heaven" },
  { lat: 0.003, lng: -0.007, name: "Tropical Acai Bar" },
  { lat: -0.005, lng: -0.003, name: "Fresh Bowl Co." }
];

// Default center (Los Angeles coordinates)
const defaultCenter = {
  lat: 34.0522,
  lng: -118.2437
};

// Function to simulate fetching coordinates based on zip code
const fetchCoordinatesByZip = async (zipCode) => {
  // Simulated response for demonstration purposes
  const zipCodeCoordinates = {
    "90001": { lat: 33.9731, lng: -118.2487 },
    "10001": { lat: 40.7128, lng: -74.0060 },
    "94101": { lat: 37.7749, lng: -122.4194 }
  };
  return zipCodeCoordinates[zipCode] || defaultCenter;
};

const LocationMap = ({ zipCode }) => {
  const [currentLocation, setCurrentLocation] = useState(defaultCenter);
  const [isLoading, setIsLoading] = useState(true);
  const [nearbyLocations, setNearbyLocations] = useState([]);
  const toast = useToast();

  useEffect(() => {
    const updateLocations = async () => {
      try {
        const location = await fetchCoordinatesByZip(zipCode);
        setCurrentLocation(location);

        // Generate sample nearby locations based on the fetched location
        const nearby = SAMPLE_OFFSETS.map(offset => ({
          lat: location.lat + offset.lat,
          lng: location.lng + offset.lng,
          name: offset.name
        }));
        setNearbyLocations(nearby);
      } catch (error) {
        console.error('Error fetching location:', error);
        toast({
          title: 'Location Error',
          description: 'Unable to fetch location for the provided zip code. Showing default map view.',
          status: 'warning',
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setIsLoading(false);
      }
    };

    updateLocations();
  }, [zipCode, toast]);

  if (isLoading) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        height="500px"
        backgroundColor="gray.50"
      >
        <Spinner 
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="purple.500"
          size="xl"
        />
      </Box>
    );
  }

  return (
    <Box 
      borderRadius="lg" 
      overflow="hidden" 
      boxShadow="xl" 
      border="1px" 
      borderColor="gray.200"
    >
      <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={currentLocation}
          zoom={14}
          options={{
            styles: [
              {
                featureType: "poi",
                elementType: "labels",
                stylers: [{ visibility: "off" }]
              }
            ]
          }}
        >
          {/* User's location marker */}
          <Marker
            position={currentLocation}
            icon={{
              url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png"
            }}
          />

          {/* Nearby acai bowl locations */}
          {nearbyLocations.map((location, index) => (
            <Marker
              key={index}
              position={location}
              title={location.name}
              icon={{
                url: "https://maps.google.com/mapfiles/ms/icons/purple-dot.png"
              }}
            />
          ))}
        </GoogleMap>
      </LoadScript>
    </Box>
  );
};

export default LocationMap;