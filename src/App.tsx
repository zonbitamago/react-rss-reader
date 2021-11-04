import {
  Box,
  Center,
  ChakraProvider,
  Grid,
  ScaleFade,
  Image,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { RecoilRoot } from "recoil";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Timeline from "./components/Timeline";

function App() {
  const [isOpen, setIsOpen] = useState(true);
  if (isOpen) {
    setTimeout(() => {
      console.log(1);
      setIsOpen(false);
    }, 2000);
  }

  return (
    <ChakraProvider>
      <RecoilRoot>
        <Box w="100vw" h="100vh">
          <ScaleFade initialScale={0.9} in={isOpen} unmountOnExit={true}>
            <Center h="100vh">
              <motion.div animate={{ scale: 2 }} transition={{ duration: 0.5 }}>
                <Center>
                  <Image src="./icon.png" w="30%" />
                </Center>
              </motion.div>
            </Center>
          </ScaleFade>

          <Grid templateColumns="55px 1fr">
            <Sidebar />
            <Grid templateRows="40px 1fr">
              <Header />
              <Timeline />
            </Grid>
          </Grid>
        </Box>
      </RecoilRoot>
    </ChakraProvider>
  );
}

export default App;
