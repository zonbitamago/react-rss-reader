import { useEffect, useState } from "react";
import dayjs from "dayjs";

export const useClock = (): [MMDD: string, HHMMSS: string] => {
  const [MMDD, setMMDD] = useState("");
  const [HHMMSS, setHHMMSS] = useState("");

  const runClock = () => {
    const now = new Date();
    setMMDD(dayjs(now).format("MM/DD"));
    setHHMMSS(dayjs(now).format("HH:mm:ss"));
  };

  useEffect(() => {
    // ロード時読み込み用
    runClock();

    // 1秒おきにclockを更新
    setInterval(runClock, 1000);
  }, []);

  return [MMDD, HHMMSS];
};
