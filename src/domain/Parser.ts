import Parser from "rss-parser";

export const parseFeed = async (url: string) => {
  const parser = new Parser();

  const feed = await parser.parseURL(url);
  return feed;
};

export const parseFeeds = async (urls: string[]) => {
  const promises = urls.map((url) => {
    return parseFeed(url);
  });

  const tmpResult = await Promise.all(promises);

  const result = tmpResult.map((elem) => {
    return elem;
  });

  return result;
};
