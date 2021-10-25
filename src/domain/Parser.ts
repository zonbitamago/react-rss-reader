import Parser from "rss-parser";

export const parseFeed = async (url: string) => {
  const parser = new Parser();
  const feed = await parser.parseURL(url);
  return feed;
};
