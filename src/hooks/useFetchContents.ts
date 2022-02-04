import { useState } from "react";
import { useRecoilValue } from "recoil";
import { fetchTwitterList, margeFeeds, parseFeeds } from "../domain/Parser";
import {
  rssArticlesAtomIF,
  rssSettingListAtom,
  twitterSettingAtom,
} from "../recoil/Atoms";

export const useFetchContents = () => {
  const [isLoading, setIsLoading] = useState(false);
  const rssSettingList = useRecoilValue(rssSettingListAtom);
  const twitterSettingValue = useRecoilValue(twitterSettingAtom);

  const fetchContents = async () => {
    let parsedFeeds = [];
    try {
      setIsLoading(true);

      const args = rssSettingList.map((elem) => {
        return {
          site_name: elem.title,
          url: elem.url,
        };
      });

      const feeds = await parseFeeds(args);

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

      parsedFeeds = margeFeeds(feeds, twitterDatas);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      throw error;
    }

    setIsLoading(false);

    return parsedFeeds;
  };

  return { isLoading, fetchContents };
};
