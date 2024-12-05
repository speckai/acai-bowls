"use client";

import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  IconButton,
  useDisclosure,
  VStack,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

// Hamburger menu icon component
const HamburgerIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Benefits", href: "/benefits" },
    { label: "Find Locations", href: "/locations" },
  ];

  return (
    <Box
      as="nav"
      position="fixed"
      w="100%"
      zIndex="1000"
      bg={scrolled ? "white" : "transparent"}
      transition="all 0.3s ease-in-out"
      boxShadow={scrolled ? "sm" : "none"}
    >
      <Container maxW="container.xl" px={4}>
        <Flex h="70px" align="center" justify="space-between">
          {/* Logo */}
          <Link href="/" passHref>
            <Box position="relative" w="150px" h="40px" cursor="pointer">
              <Image
                src="/logo.png"
                alt="Festive Lights Pro Logo"
                fill
                style={{ objectFit: "contain" }}
                priority
              />
            </Box>
          </Link>

          {/* Desktop Navigation */}
          <HStack spacing={8} display={{ base: "none", md: "flex" }}>
            {navItems.map((item) => (
              <Link key={item.label} href={item.href} passHref>
                <Button
                  variant="ghost"
                  colorScheme="purple"
                  size="md"
                  fontWeight="medium"
                  _hover={{
                    bg: "purple.50",
                    transform: "translateY(-2px)",
                  }}
                  transition="all 0.2s"
                >
                  {item.label}
                </Button>
              </Link>
            ))}
          </HStack>

          {/* Mobile Menu Button */}
          <IconButton
            display={{ base: "flex", md: "none" }}
            aria-label="Open menu"
            variant="ghost"
            icon={<HamburgerIcon />}
            onClick={onOpen}
            colorScheme="purple"
          />
        </Flex>
      </Container>

      {/* Mobile Drawer */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Menu</DrawerHeader>
          <DrawerBody>
            <VStack spacing={4} align="stretch" mt={4}>
              {navItems.map((item) => (
                <Link key={item.label} href={item.href} passHref>
                  <Button
                    w="full"
                    variant="ghost"
                    colorScheme="purple"
                    onClick={onClose}
                  >
                    {item.label}
                  </Button>
                </Link>
              ))}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Navbar;