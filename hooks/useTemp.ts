import { tempClear, tempSize } from "@/utils/clearTemp";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Log } from "@/utils/logger";
import { updateTaskList } from "@/utils/updateTaskStore";
import { uploadSelector, useAppSelector } from "@/stores";
import { DEFAULT_UPLOAD_PATH, DEFAULT_UPLOAD_RES, DEFAULT_UPLOAD_TYPE } from "@/settings";

const _ = undefined;
export const useTemp = () => {
  Log.Console("useTemp");
  const { TasksList } = useAppSelector(uploadSelector);
  const [TempSize, setTempSize] = useState(0);
  const GetSize = useCallback(async () => {
    const size = await tempSize();
    if (size <= 0) setTempSize(0);
    else setTempSize(size);
  }, []);
  useEffect(() => {
    GetSize().then();
  }, [GetSize]);
  const ClearTemp = useCallback(async () => {
    const res = await tempClear();
    if (!res) return false;
    await GetSize();
    TasksList.forEach((task, TaskIndex) => {
      task.buildings.forEach((building, BuildingIndex) => {
        building.pens.forEach((pen, PenIndex) => {
          updateTaskList({
            TaskIndex,
            BuildingIndex,
            PenIndex
          }, DEFAULT_UPLOAD_PATH, DEFAULT_UPLOAD_TYPE, DEFAULT_UPLOAD_RES, DEFAULT_UPLOAD_RES, _);
        });
      });
    });
    updateTaskList({
      TaskIndex: 0,
      BuildingIndex: 0,
      PenIndex: 0
    }, DEFAULT_UPLOAD_PATH, DEFAULT_UPLOAD_TYPE, DEFAULT_UPLOAD_RES, DEFAULT_UPLOAD_RES, true);
    return true;
  }, [GetSize, TasksList]);
  return useMemo(() => ({
    ClearTemp,
    TempSize
  }), [ClearTemp, TempSize]);
};
