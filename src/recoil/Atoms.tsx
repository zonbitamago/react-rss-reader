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

const defaultRssSettingList: { title: string; url: string }[] = [];
const initialRssSettingList =
  ls.get<{ title: string; url: string }[]>("rssSettingListAtom");

export const rssSettingListAtom = atom<{ title: string; url: string }[]>({
  key: "rssSettingListAtom",
  default: initialRssSettingList
    ? initialRssSettingList
    : defaultRssSettingList,
});
