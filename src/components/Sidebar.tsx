import {
  Box,
  Button,
  Flex,
  Icon,
  Link,
  Text,
  ToastId,
  useToast,
} from "@chakra-ui/react";
import { motion, useAnimation } from "framer-motion";
import React, { Fragment, MouseEventHandler, useEffect, useState } from "react";
import {
  IoLogoGithub,
  IoLogoRss,
  IoReload,
  IoSettingsSharp,
  IoLogoTwitter,
} from "react-icons/io5/";
import { IconType } from "react-icons/lib";
import { useRecoilState, useRecoilValue } from "recoil";
import { fetchTwitterList, margeFeeds, parseFeeds } from "../domain/Parser";
import { useClock } from "../hooks/useClock";
import { useTimerCallback } from "../hooks/useTimerCallback";
import {
  rssArticlesAtom,
  rssArticlesAtomIF,
  rssSettingListAtom,
  twitterSettingAtom,
} from "../recoil/Atoms";
import RssModal from "./RssModal";
import SettingModal from "./SettingModal";
import TwitterModal from "./TwitterModal";

const Sidebar = () => {
  const [MMDD, HHMMSS] = useClock();
  const [isSettingModalOpen, setIsSettingModalOpen] = useState(false);
  const [isRssModalOpen, setIsRssModalOpen] = useState(false);
  const [isTwitterModalOpen, setIsTwitterModalOpen] = useState(false);
  const rssSettingList = useRecoilValue(rssSettingListAtom);
  const [rssArticles, setRssArticles] = useRecoilState(rssArticlesAtom);
  const twitterSettingValue = useRecoilValue(twitterSettingAtom);
  const loadAnimationControl = useAnimation();
  const toast = useToast();
  const toastIdRef = React.useRef<ToastId>();

  const contentLoad = async () => {
    loadAnimationControl.start({ rotate: 360 });
    const args = rssSettingList.map((elem) => {
      return {
        site_name: elem.title,
        url: elem.url,
      };
    });

    try {
      let twitterDatas: rssArticlesAtomIF[] = [];
      if (
        twitterSettingValue.listId.length > 0 &&
        twitterSettingValue.bearerToken.length > 0
      ) {
        twitterDatas = await fetchTwitterList(
          twitterSettingValue.listId,
          twitterSettingValue.bearerToken
        );
      }

      const feeds = await parseFeeds(args);
      // console.log(feeds);
      toast({
        title: `fetch article success!`,
        status: "success",
        isClosable: true,
      });

      const parsedFeeds = margeFeeds(feeds, twitterDatas);

      // 更新するものがない場合
      if (JSON.stringify(rssArticles) === JSON.stringify(parsedFeeds)) {
        loadAnimationControl.stop();
        return;
      }

      // 更新toastが表示されている場合
      if (toast.isActive("updateContent")) {
        loadAnimationControl.stop();
        return;
      }

      toastIdRef.current = toast({
        id: "updateContent",
        duration: null,
        position: "bottom",
        render: () => (
          <Box pl="55px">
            <Button
              width="inherit"
              colorScheme="blue"
              onClick={() => {
                setRssArticles(parsedFeeds);
                // @ts-ignore
                toast.close(toastIdRef.current);
              }}>
              新しい更新を確認する。
            </Button>
          </Box>
        ),
      });

      // setRssArticles(feeds);
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
    contentLoad();
  }, []);

  useTimerCallback(contentLoad);

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
              initial={false}>
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
            <SideBarIcon
              icon={IoLogoTwitter}
              onClick={() => {
                setIsTwitterModalOpen(true);
              }}
            />
            <Link
              href="https://github.com/zonbitamago/react-rss-reader"
              isExternal>
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
      <TwitterModal
        isOpen={isTwitterModalOpen}
        closeFunction={() => {
          setIsTwitterModalOpen(false);
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
      sx={{ cursor: "pointer" }}>
      <Icon as={icon} w="100%" height="auto" />
    </Box>
  );
};

export default Sidebar;
