import {
  Avatar,
  Box,
  Divider,
  Flex,
  Link,
  Spacer,
  Text,
} from "@chakra-ui/react";
import React from "react";

const Timeline = () => {
  const timeLineList = TimelineList.map((elem) => {
    return (
      <Box>
        <Flex>
          <Avatar
            size="xs"
            bgColor="white"
            name={elem.site_name}
            src={elem.icon_url}
          />
          <Text pl={1}>{elem.site_name}</Text>
          <Spacer />
          <Text color="gray">{elem.update_date}</Text>
        </Flex>
        <Link color="blue.400" href={elem.url} isExternal>
          {elem.title}
        </Link>
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
