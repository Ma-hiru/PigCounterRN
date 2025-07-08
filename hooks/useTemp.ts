import { tempClear, tempSize } from "@/utils/clearTemp";
import { useCallback, useEffect, useMemo, useState } from "react";

export const useTemp = () => {
  const [TempSize, setTempSize] = useState(0);
  const GetSize = useCallback(async () => {
    const size = await tempSize();
    if (size <= 0) setTempSize(0);
    else setTempSize(size);
  }, []);
  useEffect(() => {
    GetSize().then();
  }, [GetSize]);
  //TODO 更换清除Store存储本地缓存的方式
  const ClearTemp = useCallback(async () => {
    const res = await tempClear();
    await GetSize();
    return res;
  }, [GetSize]);
  return useMemo(() => ({
    ClearTemp,
    TempSize
  }), [ClearTemp, TempSize]);
};
