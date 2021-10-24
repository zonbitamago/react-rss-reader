import { atom } from "recoil";

export const updateDurationAtom = atom({
  key: "updateDurationAtom",
  default: 5,
});

export const rssSettingListAtom = atom<{ title: string; url: string }[]>({
  key: "rssSettingListAtom",
  default: [],
});
