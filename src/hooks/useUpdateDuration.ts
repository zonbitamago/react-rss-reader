import { useState } from "react";
import { useRecoilState } from "recoil";
import { updateDurationAtom } from "../recoil/Atoms";
import * as ls from "local-storage";

export const useUpdateDuration = (): [
  updateDuration: string,
  setUpdateDuration: React.Dispatch<React.SetStateAction<string>>,
  setLocalUpdateDuration: (updateDurationValue: number) => void
] => {
  const [recoilUpdateDuration, setRecoilUpdateDuration] =
    useRecoilState(updateDurationAtom);
  const [updateDuration, setUpdateDuration] = useState(
    recoilUpdateDuration.toString()
  );

  const setLocalUpdateDuration = (updateDurationValue: number) => {
    setRecoilUpdateDuration(updateDurationValue);
    ls.set<number>("updateDurationAtom", updateDurationValue);
  };

  return [updateDuration, setUpdateDuration, setLocalUpdateDuration];
};
