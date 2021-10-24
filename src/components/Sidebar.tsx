import { Box, Flex, Icon, Link, Text } from "@chakra-ui/react";
import dayjs from "dayjs";
import React, { Fragment, MouseEventHandler, useEffect, useState } from "react";
import {
  IoLogoGithub,
  IoLogoRss,
  IoReload,
  IoSettingsSharp,
} from "react-icons/io5";
import { IconType } from "react-icons/lib";
import { setInterval } from "timers";
import RssModal from "./RssModal";
import SettingModal from "./SettingModal";

const Sidebar = () => {
  const [MMDD, setMMDD] = useState("");
  const [HHMMSS, setHHMMSS] = useState("");
  const [isSettingModalOpen, setIsSettingModalOpen] = useState(false);
  const [isRssModalOpen, setIsRssModalOpen] = useState(false);

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
    <Fragment>
      <Box h="100vh" bgColor="blue.600" color="white">
        <Flex direction="column" justify="space-between" h="100%">
          <Box>
            <SideBarIcon icon={IoReload} />
            <SideBarIcon
              icon={IoLogoRss}
              onClick={() => {
                setIsRssModalOpen(true);
              }}
            />
            <SideBarIcon
              icon={IoSettingsSharp}
              onClick={() => {
                setIsSettingModalOpen(true);
              }}
            />
            <Link
              href="https://github.com/zonbitamago/react-rss-reader"
              isExternal
            >
              <SideBarIcon icon={IoLogoGithub} />
            </Link>
          </Box>
          <Box>
            <Text fontSize="xs">{MMDD}</Text>
            <Text fontSize="xs">{HHMMSS}</Text>
          </Box>
        </Flex>
      </Box>
      <RssModal
        isOpen={isRssModalOpen}
        closeFunction={() => {
          setIsRssModalOpen(false);
        }}
      />
      <SettingModal
        isOpen={isSettingModalOpen}
        closeFunction={() => {
          setIsSettingModalOpen(false);
        }}
      />
    </Fragment>
  );
};

const SideBarIcon = ({
  icon,
  onClick,
}: {
  icon: IconType;
  onClick?: MouseEventHandler<HTMLDivElement>;
}) => {
  const clicAction = onClick ? onClick : () => {};
  return (
    <Box
      ml={2}
      mr={2}
      pt={2}
      pb={2}
      onClick={clicAction}
      sx={{ cursor: "pointer" }}
    >
      <Icon as={icon} w="100%" height="auto" />
    </Box>
  );
};

export default Sidebar;
