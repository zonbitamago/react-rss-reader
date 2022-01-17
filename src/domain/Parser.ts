import axios, { AxiosResponse } from "axios";
import dayjs from "dayjs";
import { rssArticlesAtomIF } from "../recoil/Atoms";

export const parseFeeds = async (
  urls: { site_name: string; url: string }[]
) => {
  if (urls.length === 0) return [];

  const urlBlocks = arrayChunk(urls, 5);

  const promiseList = urlBlocks.map(
    (elem: { site_name: string; url: string }[]) => {
      return getParseTempResult(elem);
    }
  );

  const tmpBlockResult: { data: { results: any[] } }[] = await Promise.all(
    promiseList
  );

  const tmpResult = tmpBlockResult.flatMap((elem) => {
    return elem.data.results;
  });

  const result: rssArticlesAtomIF[] = tmpResult
    .map((elem: { url: string; feed: { items: any } }) => {
      const siteNameElem = urls.find((url) => {
        return url.url === elem.url;
      });

      const items = elem.feed.items.map((element: any) => {
        let retVal = element;
        retVal.site_name = siteNameElem?.site_name;
        // retVal.domain = getDomain(siteNameElem?.url);
        retVal.icon_url = `https://www.google.com/s2/favicons?sz=64&domain=${getDomain(
          siteNameElem?.url
        )}`;
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

export const getParseTempResult = async (
  urls: { site_name?: string; url: string }[]
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

  return tmpResult;
};

const arrayChunk = ([...array], size = 1) => {
  return array.reduce(
    (acc, value, index) =>
      index % size ? acc : [...acc, array.slice(index, index + size)],
    []
  );
};

export const getDomain = (url: string | undefined) => {
  if (!url) throw new Error();
  let domain = url.split("://")[1];
  domain = domain.split("/")[0];
  return domain;
};
