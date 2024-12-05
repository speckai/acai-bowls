"use client";

import { ChakraProvider as Chakra, extendTheme } from "@chakra-ui/react";
import { type ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  colors: {
    purple: {
      50: "#f5e9ff",
      100: "#dbc1ff",
      200: "#c199ff",
      300: "#a770ff",
      400: "#8d48ff",
      500: "#741fff",
      600: "#5a15cc",
      700: "#410f99",
      800: "#280966",
      900: "#100333",
    },
  },
  fonts: {
    heading: "var(--font-family, Arial)",
    body: "var(--font-family, Arial)",
  },
  styles: {
    global: {
      body: {
        bg: "white",
        color: "gray.800",
      },
    },
  },
  components: {
    Button: {
      defaultProps: {
        colorScheme: "purple",
      },
    },
  },
});

export function ChakraProvider({ children }: { children: React.ReactNode }) {
  return <Chakra theme={theme}>{children}</Chakra>;
}