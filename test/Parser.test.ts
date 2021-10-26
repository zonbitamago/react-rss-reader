import { parseFeeds } from "../src/domain/Parser";

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
    // console.log(result[0]);

    expect(result[0].updatedParsed).toBe("2012-12-31T17:00:00Z");
    expect(result[10].updatedParsed).toBe("2004-10-19T15:08:56Z");
  });
});
