import {
  Avatar,
  Box,
  Divider,
  Flex,
  Link,
  Spacer,
  Text,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import React from "react";
import { useRecoilValue } from "recoil";
import { rssArticlesAtom } from "../recoil/Atoms";

const Timeline = () => {
  const rssArticles = useRecoilValue(rssArticlesAtom);

  const timeLineList = rssArticles.map((elem, idx) => {
    return (
      <Box pt={1} key={idx}>
        <Flex>
          <Avatar
            size="xs"
            bgColor="white"
            name={elem.site_name}
            loading="lazy"
            src={`https://www.google.com/s2/favicons?sz=64&domain=${elem.domain}`}
          />
          <Text pl={1}>{elem.site_name}</Text>
          <Spacer />
          <Text color="gray">
            {dayjs(elem.updatedParsed).format("YYYY/MM/DD HH:mm:ss")}
          </Text>
        </Flex>
        <Box ml={7}>
          <Link color="blue.400" href={elem.link} isExternal>
            {elem.title}
          </Link>
        </Box>
        <Divider />
      </Box>
    );
  });
  return (
    <Box h="calc(100vh - 55px)" sx={{ overflow: "scroll" }}>
      {timeLineList}
    </Box>
  );
};

let TimelineList: {
  site_name: string;
  update_date: string;
  icon_url: string;
  title: string;
  url: string;
}[] = [];

for (let index = 0; index < 20; index++) {
  TimelineList.push({
    site_name: "Qiita",
    update_date: "2021/10/23 20:31:22",
    icon_url: "http://www.google.com/s2/favicons?domain=qiita.com",
    title: "Mac BigSurでM5Stamp C3(ESP32 C3)にArduino IDEで書き込みたい",
    url: "https://qiita.com/necobut/items/8c45af1a8ba975697a7d?utm_campaign=popular_items&utm_medium=feed&utm_source=popular_items",
  });
}

export default Timeline;
