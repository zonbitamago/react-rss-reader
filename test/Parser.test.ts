import { parseFeed, parseFeeds } from "../src/domain/Parser";
// import { parseFeed } from "@src/domain/Parser";

describe("parserFeed", () => {
  test("Rss Feed ", async () => {
    const arg = {
      site_name: "sampleRSS",
      url: "https://www.feedforall.com/sample.xml",
    };
    const result = await parseFeed(arg);
    //   console.log(result);

    expect(result.length).toBe(9);
    expect(result[0].site_name).toBe("sampleRSS");
  });

  test("Atom Feed ", async () => {
    const arg = {
      site_name: "sampleAtom",
      url: "https://so-zou.jp/web-app/tech/feed/atom/sample.atom",
    };
    const result = await parseFeed(arg);
    //   console.log(result);

    expect(result.length).toBe(2);
    expect(result[0].site_name).toBe("sampleAtom");
  });
});

describe("parserFeeds", () => {
  test("ArrayFeeds", async () => {
    const feeds = [
      {
        site_name: "sampleRSS",
        url: "https://www.feedforall.com/sample.xml",
      },
      {
        site_name: "sampleAtom",
        url: "https://so-zou.jp/web-app/tech/feed/atom/sample.atom",
      },
    ];
    const result = await parseFeeds(feeds);

    // 2つのRSSが混在している状態
    expect(result.length).toBe(11);
    expect(
      result.filter((elem) => {
        return elem.site_name === "sampleRSS";
      }).length
    ).toBe(9);
    expect(
      result.filter((elem) => {
        return elem.site_name === "sampleAtom";
      }).length
    ).toBe(2);

    // 日付の降順
    expect(result[0].isoDate).toBe("2012-12-31T17:00:00.000Z");
    expect(result[10].isoDate).toBe("2004-10-19T15:08:56.000Z");
  });
});
