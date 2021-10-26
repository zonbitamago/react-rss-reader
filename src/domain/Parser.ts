import axios from "axios";
import dayjs from "dayjs";

export const parseFeeds = async (
  urls: { site_name: string; url: string }[]
) => {
  const body = {
    urls: urls.map((elem) => {
      return { url: elem.url };
    }),
  };

  const tmpResult = await axios.post(
    "https://goparallelfeed.vercel.app",
    body,
    {
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
    }
  );

  const result = tmpResult.data.results
    .map((elem: { url: string; feed: { items: any } }) => {
      const siteNameElem = urls.find((url) => {
        return url.url === elem.url;
      });

      const items = elem.feed.items.map((element: any) => {
        let retVal = element;
        retVal.site_name = siteNameElem?.site_name;
        retVal.updatedParsed = element.updatedParsed
          ? element.updatedParsed
          : element.publishedParsed;
        return retVal;
      });

      return items;
    })
    .flatMap((elem: any) => {
      return elem;
    })
    .sort((a: { updatedParsed: string }, b: { updatedParsed: string }) => {
      const dayA = dayjs(a.updatedParsed);
      const dayB = dayjs(b.updatedParsed);
      return dayB.diff(dayA);
    });
  // console.log("result", result);

  return result;
};
