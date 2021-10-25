import { parseFeed } from "../src/domain/Parser";
// import { parseFeed } from "@src/domain/Parser";

describe("parserFeed", () => {
  test("Rss Feed ", async () => {
    const result = await parseFeed("https://www.feedforall.com/sample.xml");
    //   console.log(result);

    expect(result.items.length).toBe(9);
  });

  test("Atom Feed ", async () => {
    const result = await parseFeed(
      "https://so-zou.jp/web-app/tech/feed/atom/sample.atom"
    );
    //   console.log(result);

    expect(result.items.length).toBe(2);
  });
});
