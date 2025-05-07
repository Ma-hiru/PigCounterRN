import { PauseLog } from "@/utils/logger";
import dayjs from "dayjs";
import { useLogin } from "@/hooks/useLogin";
import { useFetchData } from "@/utils/fetchData";
import { uploadActions, useAppDispatch, useAppSelector, userSelector } from "@/stores";
import { useCallback } from "react";
import { getSafeValue } from "@/utils/checkNullValue";
import { DEFAULT_TASK_VAL } from "@/settings.app";

const { setTasksList, setAllTaskList } = uploadActions;
export const useGetTaskListAsync = () => {
  const { hasToken } = useLogin();
  const { fetchData, API } = useFetchData();
  const { profile } = useAppSelector(userSelector);
  const dispatch = useAppDispatch();
  return useCallback(() => {
    if (hasToken) {
      const BaseList: BaseTask[] = [];
      const List: Task[] = [];
      fetchData(
        API.reqGetTask,
        [profile.id],
        (res) => {
          PauseLog.Console("获取基本任务列表成功=>", res.data.list);
          BaseList.push(...res.data.list);
        },
        (res, toast) => {
          toast("", res?.message || "获取任务列表失败！请检查网络！");
        }
      )
        .then(async () => {
            const today = dayjs(Date.now()).startOf("day");
            await new Promise((resolve) => {
              BaseList.forEach(async ({ id, startTime }, index) => {
                const start = dayjs(startTime);
                PauseLog.Console("获取详情", id, startTime, start.isSame(today, "day"));
                if (start.isSame(today, "day")) {
                  await fetchData(
                    API.reqTaskInfo,
                    [id],
                    (res) => {
                      PauseLog.Console("获取详细任务成功", res.data.buildings);
                      List.push(getSafeValue(res.data, DEFAULT_TASK_VAL, true, [null, undefined]));
                      PauseLog.Console("详细任务checkNull", JSON.stringify(getSafeValue(res.data, DEFAULT_TASK_VAL, true,[null, undefined])));
                    },
                    (res, toast) => {
                      PauseLog.Console("获取详细任务列表失败", res);
                      toast("", res?.message || "获取任务列表失败！请检查网络！");
                    }
                  );
                }
                if (index === BaseList.length - 1) resolve(true);
              });
            });
            dispatch(setTasksList(List));
            dispatch(setAllTaskList(BaseList));
          }
        );
    }
  }, [API.reqGetTask, API.reqTaskInfo, dispatch, fetchData, hasToken, profile.id]);
};
