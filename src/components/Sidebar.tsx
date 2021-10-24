import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import {
  IoLogoGithub,
  IoLogoRss,
  IoReload,
  IoSettingsSharp,
} from "react-icons/io5";
import { IconType } from "react-icons/lib";
import { setInterval } from "timers";

const Sidebar = () => {
  const [MMDD, setMMDD] = useState("");
  const [HHMMSS, setHHMMSS] = useState("");

  const runClock = () => {
    const now = new Date();
    setMMDD(dayjs(now).format("MM/DD"));
    setHHMMSS(dayjs(now).format("HH:mm:ss"));
  };

  useEffect(() => {
    // ロード時読み込み用
    runClock();

    // 1秒おきにclockを更新
    setInterval(runClock, 1000);
  }, []);

  return (
    <Box h="100vh" bgColor="blue.600" color="white">
      <Flex direction="column" justify="space-between" h="100%">
        <Box>
          <SideBarIcon icon={IoReload} />
          <SideBarIcon icon={IoLogoRss} />
          <SideBarIcon icon={IoSettingsSharp} />
          <SideBarIcon icon={IoLogoGithub} />
        </Box>
        <Box>
          <Text fontSize="xs">{MMDD}</Text>
          <Text fontSize="xs">{HHMMSS}</Text>
        </Box>
      </Flex>
    </Box>
  );
};

const SideBarIcon = ({ icon }: { icon: IconType }) => {
  return (
    <Box ml={2} mr={2} pt={2} pb={2}>
      <Icon as={icon} w="100%" height="auto" />
    </Box>
  );
};

export default Sidebar;
