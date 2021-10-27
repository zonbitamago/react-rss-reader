import { atom } from "recoil";
import * as ls from "local-storage";

const defaultUpdateDuration = 5;
const initialUpdateDuration = ls.get<number>("updateDurationAtom");

export const updateDurationAtom = atom({
  key: "updateDurationAtom",
  default: initialUpdateDuration
    ? initialUpdateDuration
    : defaultUpdateDuration,
});

interface rssSettingListAtomIF {
  title: string;
  url: string;
}
const defaultRssSettingList: rssSettingListAtomIF[] = [];
const initialRssSettingList =
  ls.get<rssSettingListAtomIF[]>("rssSettingListAtom");

export const rssSettingListAtom = atom<rssSettingListAtomIF[]>({
  key: "rssSettingListAtom",
  default: initialRssSettingList
    ? initialRssSettingList
    : defaultRssSettingList,
});

interface rssArticlesAtomIF {
  domain: string;
  site_name: string;
  updatedParsed: string;
  title: string;
  link: string;
}
export const rssArticlesAtom = atom<rssArticlesAtomIF[]>({
  key: "rssArticlesAtom",
  default: [],
});

export const timerIdAtom = atom<NodeJS.Timer | undefined>({
  key: "timerIdAtom",
  default: undefined,
});
