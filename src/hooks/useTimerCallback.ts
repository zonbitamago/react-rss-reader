import { useEffect } from "react";
import { timerIdAtom, updateDurationAtom } from "../recoil/Atoms";
import { useRecoilState, useRecoilValue } from "recoil";

export const useTimerCallback = (callback: () => void) => {
  const [timerId, setTimerId] = useRecoilState(timerIdAtom);
  const updateDuration = useRecoilValue(updateDurationAtom);

  useEffect(() => {
    if (timerId) {
      clearInterval(timerId);
    }
    const updateTimerId = setInterval(callback, updateDuration * 1000 * 60);
    setTimerId(updateTimerId);
  }, [updateDuration]);
};
