"use client";

import { useEffect, useState } from 'react';
import { Box, Spinner, Text, useToast } from '@chakra-ui/react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '500px'
};

// Sample locations to show nearby (will be offset from user's location)
const SAMPLE_OFFSETS = [
  { lat: 0.01, lng: 0.01, name: "Acai Paradise" },
  { lat: -0.008, lng: 0.005, name: "Bowl Heaven" },
  { lat: 0.003, lng: -0.007, name: "Tropical Acai Bar" },
  { lat: -0.005, lng: -0.003, name: "Fresh Bowl Co." }
];

// Default center (will be replaced with user's location when available)
const defaultCenter = {
  lat: 34.0522,
  lng: -118.2437
};

const LocationMap = () => {
  const [currentLocation, setCurrentLocation] = useState(defaultCenter);
  const [isLoading, setIsLoading] = useState(true);
  const [nearbyLocations, setNearbyLocations] = useState<Array<{lat: number, lng: number, name: string}>>([]);
  const toast = useToast();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setCurrentLocation(userLocation);
          
          // Generate sample nearby locations based on user's position
          const nearby = SAMPLE_OFFSETS.map(offset => ({
            lat: userLocation.lat + offset.lat,
            lng: userLocation.lng + offset.lng,
            name: offset.name
          }));
          setNearbyLocations(nearby);
          setIsLoading(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          toast({
            title: 'Location Error',
            description: 'Unable to get your location. Showing default map view.',
            status: 'warning',
            duration: 5000,
            isClosable: true,
          });
          setIsLoading(false);
        }
      );
    } else {
      toast({
        title: 'Geolocation Not Supported',
        description: 'Your browser does not support geolocation.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      setIsLoading(false);
    }
  }, [toast]);

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