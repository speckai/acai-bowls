"use client";

import { useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardBody,
  Text,
  Heading,
  Stack,
  Input,
  Button,
  FormControl,
  FormLabel,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  useColorModeValue,
  Container,
} from "@chakra-ui/react";
import { ResponsiveLine } from "@nivo/line";
import { ResponsivePie } from "@nivo/pie";
import { ResponsiveBar } from "@nivo/bar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Mock data for monthly installations
const monthlyData = [
  {
    id: "installations",
    data: [
      { x: "Jan", y: 45 },
      { x: "Feb", y: 30 },
      { x: "Mar", y: 25 },
      { x: "Apr", y: 20 },
      { x: "May", y: 15 },
      { x: "Jun", y: 10 },
      { x: "Jul", y: 8 },
      { x: "Aug", y: 12 },
      { x: "Sep", y: 25 },
      { x: "Oct", y: 40 },
      { x: "Nov", y: 55 },
      { x: "Dec", y: 65 },
    ],
  },
];

// Mock data for service distribution
const serviceData = [
  { id: "Basic", value: 45, color: "hsl(0, 70%, 50%)" },
  { id: "Premium", value: 35, color: "hsl(120, 70%, 50%)" },
  { id: "Ultimate", value: 20, color: "hsl(240, 70%, 50%)" },
];

// Mock data for revenue
const revenueData = [
  { month: "Oct", revenue: 75000 },
  { month: "Nov", revenue: 125000 },
  { month: "Dec", revenue: 180000 },
];

export default function Dashboard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const cardBg = useColorModeValue("white", "gray.700");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // This is just UI, no actual authentication
    console.log("Login attempted");
  };

  return (
    <Box minH="100vh" bg="gray.50">
      <Navbar />
      
      <Container maxW="container.xl" py={8}>
        {/* Login Form */}
        <Card mb={8} bg={cardBg}>
          <CardBody>
            <form onSubmit={handleLogin}>
              <Stack spacing={4} maxW="400px" mx="auto">
                <Heading size="md" textAlign="center">Dashboard Login</Heading>
                <FormControl>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormControl>
                <Button colorScheme="red" type="submit">
                  Login
                </Button>
              </Stack>
            </form>
          </CardBody>
        </Card>

        {/* Summary Stats */}
        <Grid templateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }} gap={6} mb={8}>
          <Card bg={cardBg}>
            <CardBody>
              <Stat>
                <StatLabel>Total Installations</StatLabel>
                <StatNumber>350</StatNumber>
                <StatHelpText>This Season</StatHelpText>
              </Stat>
            </CardBody>
          </Card>
          <Card bg={cardBg}>
            <CardBody>
              <Stat>
                <StatLabel>Revenue</StatLabel>
                <StatNumber>$380K</StatNumber>
                <StatHelpText>YTD</StatHelpText>
              </Stat>
            </CardBody>
          </Card>
          <Card bg={cardBg}>
            <CardBody>
              <Stat>
                <StatLabel>Customer Satisfaction</StatLabel>
                <StatNumber>98%</StatNumber>
                <StatHelpText>Based on 245 reviews</StatHelpText>
              </Stat>
            </CardBody>
          </Card>
          <Card bg={cardBg}>
            <CardBody>
              <Stat>
                <StatLabel>Active Crews</StatLabel>
                <StatNumber>12</StatNumber>
                <StatHelpText>Currently Working</StatHelpText>
              </Stat>
            </CardBody>
          </Card>
        </Grid>

        {/* Charts */}
        <Grid templateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }} gap={6}>
          <Card bg={cardBg}>
            <CardBody>
              <Heading size="md" mb={4}>Monthly Installations</Heading>
              <Box h="400px">
                <ResponsiveLine
                  data={monthlyData}
                  margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                  xScale={{ type: "point" }}
                  yScale={{ type: "linear", min: 0, max: "auto" }}
                  axisTop={null}
                  axisRight={null}
                  pointSize={10}
                  pointColor={{ theme: "background" }}
                  pointBorderWidth={2}
                  pointBorderColor={{ from: "serieColor" }}
                  enableGridX={false}
                  colors={["#D42426"]}
                />
              </Box>
            </CardBody>
          </Card>

          <Card bg={cardBg}>
            <CardBody>
              <Heading size="md" mb={4}>Service Distribution</Heading>
              <Box h="400px">
                <ResponsivePie
                  data={serviceData}
                  margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                  innerRadius={0.5}
                  padAngle={0.7}
                  cornerRadius={3}
                  colors={["#D42426", "#165B33", "#0B3B24"]}
                  borderWidth={1}
                  borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
                  enableArcLinkLabels={true}
                  arcLinkLabelsSkipAngle={10}
                  arcLinkLabelsTextColor="#333333"
                />
              </Box>
            </CardBody>
          </Card>

          <Card bg={cardBg} gridColumn={{ lg: "span 2" }}>
            <CardBody>
              <Heading size="md" mb={4}>Holiday Season Revenue</Heading>
              <Box h="400px">
                <ResponsiveBar
                  data={revenueData}
                  keys={["revenue"]}
                  indexBy="month"
                  margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                  padding={0.3}
                  colors={["#165B33"]}
                  borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
                  axisTop={null}
                  axisRight={null}
                  labelSkipWidth={12}
                  labelSkipHeight={12}
                />
              </Box>
            </CardBody>
          </Card>
        </Grid>
      </Container>

      <Footer />
    </Box>
  );
}