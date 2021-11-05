import {
  getDomain,
  getParseTempResult,
  parseFeeds,
} from "../src/domain/Parser";

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

describe("getDomain", () => {
  test("domain has slash end", () => {
    const url = "https://www.feedforall.com/sample.xml";

    const result = getDomain(url);

    expect(result).toBe("www.feedforall.com");
  });

  test("domain no slash end", () => {
    const url = "https://www.feedforall.com";

    const result = getDomain(url);

    expect(result).toBe("www.feedforall.com");
  });
});

describe("getParseTempResult", () => {
  test("valid url", async () => {
    const url = "https://www.feedforall.com/sample.xml";
    const param = [{ url: url }];
    const result = await getParseTempResult(param);

    expect(result.data.results[0].result).toBe(true);
  });

  test("invalid url", async () => {
    const url = "a";
    const param = [{ url: url }];
    const result = await getParseTempResult(param);

    expect(result.data.results[0].result).toBe(false);
  });
});
