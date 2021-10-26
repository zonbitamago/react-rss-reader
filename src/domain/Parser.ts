import dayjs from "dayjs";
import Parser from "rss-parser";

export const parseFeed = async (arg: { site_name: string; url: string }) => {
  const parser = new Parser();

  const feed = await parser.parseURL(arg.url);
  const result = feed.items.map((elem) => {
    elem.site_name = arg.site_name;
    return elem;
  });
  return result;
};

export const parseFeeds = async (
  urls: { site_name: string; url: string }[]
) => {
  const promises = urls.map((url) => {
    return parseFeed(url);
  });

  const tmpResult = await Promise.all(promises);

  const result = tmpResult
    .flatMap((elem) => {
      return elem;
    })
    .sort((a, b) => {
      const dayA = dayjs(a.isoDate);
      const dayB = dayjs(b.isoDate);
      return dayB.diff(dayA);
    });

  return result;
};
