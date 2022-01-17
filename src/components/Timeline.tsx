import {
  Avatar,
  Box,
  Divider,
  Flex,
  Link,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Spacer,
  Text,
} from "@chakra-ui/react";

import dayjs from "dayjs";
import React, { Fragment, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { articleShowWeekAtom, rssArticlesAtom } from "../recoil/Atoms";

const Timeline = () => {
  const rssArticles = useRecoilValue(rssArticlesAtom);
  const articleShowWeek = useRecoilValue(articleShowWeekAtom);
  const baseDate = dayjs().subtract(articleShowWeek, "w");

  const dummyTimeLineList: JSX.Element[] = [];
  for (let i = 0; i < 10; i++) {
    const dummyTile = (
      <Fragment key={i}>
        <Box padding="2" boxShadow="lg" bg="white">
          <SkeletonCircle size="5" speed={2} />
          <SkeletonText mt="2" noOfLines={2} spacing="2" speed={2} />
        </Box>
        <Divider />
      </Fragment>
    );

    dummyTimeLineList.push(dummyTile);
  }

  const tmpTimeLineList = rssArticles
    .filter((elem) => {
      return dayjs(elem.updatedParsed).isAfter(baseDate);
    })
    .map((elem, idx) => {
      return (
        <Box pt={1} key={idx}>
          <Flex>
            <Avatar
              size="xs"
              bgColor="white"
              name={elem.site_name}
              loading="lazy"
              src={elem.icon_url}
            />
            <Text pl={1}>{elem.site_name}</Text>
            <Spacer />
            <Text color="gray" fontSize="xs">
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

  const timeLineList =
    tmpTimeLineList.length > 0 ? tmpTimeLineList : dummyTimeLineList;

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

export default Timeline;
