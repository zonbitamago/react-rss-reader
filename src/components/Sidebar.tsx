/** @jsxImportSource @emotion/react */
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
import React, { Fragment, MouseEventHandler, useEffect, useState } from "react";
import {
  IoLogoGithub,
  IoLogoRss,
  IoReload,
  IoSettingsSharp,
  IoLogoTwitter,
} from "react-icons/io5/";
import { IconType } from "react-icons/lib";
import { useRecoilState } from "recoil";
import { useClock } from "../hooks/useClock";
import { useTimerCallback } from "../hooks/useTimerCallback";
import { rssArticlesAtom } from "../recoil/Atoms";
import RssModal from "./RssModal";
import SettingModal from "./SettingModal";
import TwitterModal from "./TwitterModal";
import { keyframes } from "@emotion/react";
import { useFetchContents } from "../hooks/useFetchContents";

const Sidebar = () => {
  const [MMDD, HHMMSS] = useClock();
  const { isLoading, fetchContents } = useFetchContents();
  const [isSettingModalOpen, setIsSettingModalOpen] = useState(false);
  const [isRssModalOpen, setIsRssModalOpen] = useState(false);
  const [isTwitterModalOpen, setIsTwitterModalOpen] = useState(false);
  const [rssArticles, setRssArticles] = useRecoilState(rssArticlesAtom);
  const toast = useToast();
  const toastIdRef = React.useRef<ToastId>();

  const contentLoad = async () => {
    try {
      const parsedFeeds = await fetchContents();
      toast({
        title: `fetch article success!`,
        status: "success",
        isClosable: true,
      });

      // 更新するものがない場合
      if (JSON.stringify(rssArticles) === JSON.stringify(parsedFeeds)) {
        return;
      }

      // 更新toastが表示されている場合
      if (toast.isActive("updateContent")) {
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
    } catch (error) {
      console.error(error);
      toast({
        title: `fetch article fail!`,
        status: "error",
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    contentLoad();
  }, []);

  useTimerCallback(contentLoad);

  const loadingAnimation = isLoading
    ? { animation: `${rotateAnime} 1.5s linear infinite` }
    : {};

  return (
    <Fragment>
      <Box h="100vh" bgColor="blue.600" color="white">
        <Flex direction="column" justify="space-between" h="100%">
          <Box>
            <div css={loadingAnimation}>
              <SideBarIcon
                icon={IoReload}
                onClick={() => {
                  contentLoad();
                }}
              />
            </div>
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

const rotateAnime = keyframes`
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
`;
