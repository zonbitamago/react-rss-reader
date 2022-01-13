import { useState } from "react";
import { useRecoilState } from "recoil";
import { articleShowWeekAtom } from "../recoil/Atoms";
import * as ls from "local-storage";

export const useArticleShowWeek = (): [
  articleShowWeek: string,
  setArticleShowWeek: React.Dispatch<React.SetStateAction<string>>,
  setLocalArcileShowWeek: (articleShowWeekValue: number) => void
] => {
  const [recoilArticleShowWeek, setRecoilArticleShowWeek] =
    useRecoilState(articleShowWeekAtom);
  const [articleShowWeek, setArticleShowWeek] = useState(
    recoilArticleShowWeek.toString()
  );

  const setLocalArcileShowWeek = (articleShowWeekValue: number) => {
    setRecoilArticleShowWeek(articleShowWeekValue);
    ls.set<number>("articleShowWeekAtom", articleShowWeekValue);
  };

  return [articleShowWeek, setArticleShowWeek, setLocalArcileShowWeek];
};
