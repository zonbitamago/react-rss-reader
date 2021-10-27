import { Box, Flex, Icon, Link, Text, useToast } from "@chakra-ui/react";
import dayjs from "dayjs";
import { motion, useAnimation } from "framer-motion";
import React, { Fragment, MouseEventHandler, useEffect, useState } from "react";
import {
  IoLogoGithub,
  IoLogoRss,
  IoReload,
  IoSettingsSharp,
} from "react-icons/io5";
import { IconType } from "react-icons/lib";
import { useRecoilState, useRecoilValue } from "recoil";
import { parseFeeds } from "../domain/Parser";
import {
  rssArticlesAtom,
  rssSettingListAtom,
  timerIdAtom,
  updateDurationAtom,
} from "../recoil/Atoms";
import RssModal from "./RssModal";
import SettingModal from "./SettingModal";

const Sidebar = () => {
  const [MMDD, setMMDD] = useState("");
  const [HHMMSS, setHHMMSS] = useState("");
  const [isSettingModalOpen, setIsSettingModalOpen] = useState(false);
  const [isRssModalOpen, setIsRssModalOpen] = useState(false);
  const rssSettingList = useRecoilValue(rssSettingListAtom);
  const updateDuration = useRecoilValue(updateDurationAtom);
  const [timerId, setTimerId] = useRecoilState(timerIdAtom);
  const [, setRssArticles] = useRecoilState(rssArticlesAtom);
  const loadAnimationControl = useAnimation();
  const toast = useToast();

  const runClock = () => {
    const now = new Date();
    setMMDD(dayjs(now).format("MM/DD"));
    setHHMMSS(dayjs(now).format("HH:mm:ss"));
  };

  const contentLoad = async () => {
    loadAnimationControl.start({ rotate: 360 });
    const args = rssSettingList.map((elem) => {
      return {
        site_name: elem.title,
        url: elem.url,
      };
    });

    try {
      const feeds = await parseFeeds(args);
      // console.log(feeds);
      setRssArticles(feeds);
      toast({
        title: `fetch article success!`,
        status: "success",
        isClosable: true,
      });
    } catch (error) {
      console.error(error);
      toast({
        title: `fetch article fail!`,
        status: "error",
        isClosable: true,
      });
    }
    loadAnimationControl.stop();
  };

  useEffect(() => {
    // ロード時読み込み用
    runClock();

    // 1秒おきにclockを更新
    setInterval(runClock, 1000);

    // 初回読み込み
    contentLoad();
  }, []);

  useEffect(() => {
    if (timerId) {
      clearInterval(timerId);
    }
    const updateTimerId = setInterval(contentLoad, updateDuration * 1000 * 60);
    setTimerId(updateTimerId);
  }, [updateDuration]);

  return (
    <Fragment>
      <Box h="100vh" bgColor="blue.600" color="white">
        <Flex direction="column" justify="space-between" h="100%">
          <Box>
            <motion.div
              animate={loadAnimationControl}
              transition={{
                type: "tween",
                ease: "linear",
                repeat: Infinity,
                duration: 1.5,
              }}
              initial={false}
            >
              <SideBarIcon
                icon={IoReload}
                onClick={() => {
                  contentLoad();
                }}
              />
            </motion.div>
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
