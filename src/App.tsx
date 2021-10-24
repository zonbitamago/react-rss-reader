import { Box, ChakraProvider, Grid } from "@chakra-ui/react";
import React from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Timeline from "./components/Timeline";

function App() {
  return (
    <ChakraProvider>
      <Box w="100vw" h="100vh">
        <Grid templateColumns="55px 1fr">
          <Sidebar />
          <Grid templateRows="40px 1fr">
            <Header />
            <Timeline />
          </Grid>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
