import { useState } from "react";
import { useRecoilState } from "recoil";
import { twitterSettingAtom, twitterSettingAtomIF } from "../recoil/Atoms";
import * as ls from "local-storage";

export const useTwitterSetting = () => {
  const [recoilTwitterSetting, setRecoilTwitterSetting] =
    useRecoilState(twitterSettingAtom);

  const [listId, setListId] = useState(recoilTwitterSetting.listId);
  const [bearerToken, setBearerToken] = useState(
    recoilTwitterSetting.bearerToken
  );

  const setLocalTwitterSetting = (listId: string, bearerToken: string) => {
    const value = { listId: listId, bearerToken: bearerToken };
    setRecoilTwitterSetting(value);
    ls.set<twitterSettingAtomIF>("twitterSettingAtom", value);
  };

  return {
    listId,
    setListId,
    bearerToken,
    setBearerToken,
    setLocalTwitterSetting,
  };
};
