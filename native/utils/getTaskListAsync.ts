import dayjs from "dayjs";
import { useFetchData } from "@/utils/fetchData";
import { useCallback } from "react";
import { getSafeValue } from "@/utils/checkNullValue";
import { DEFAULT_TASK_VAL } from "@/settings.app";
import { useUserZustandStore } from "@/stores/zustand/user";
import { useTaskZustandStore } from "@/stores/zustand/task";
import { useShallow } from "zustand/react/shallow";
import { Log  } from "@/utils/logger";


export const useGetTaskListAsync = () => {
  const { fetchData, API } = useFetchData();
  const { profile, isLogin } = useUserZustandStore(
    useShallow(state => ({
      profile: state.profile,
      isLogin: state.isLogin
    }))
  );
  const { setTasksList, setAllTaskList } = useTaskZustandStore(
    useShallow(state => ({
      setTasksList: state.setTasksList,
      setAllTaskList: state.setAllTaskList
    }))
  );


  const GetTaskDetail = useCallback(async (BaseList: BaseTask[]) => {
    Log.Console("获取基本任务列表成功=>", BaseList);
    const today = dayjs(Date.now()).startOf("day");
    const List: Task[] = [];
    for (const { startTime, id } of BaseList) {
      if (dayjs(startTime).isSame(today, "day")) {
        await fetchData(
          API.reqTaskInfo,
          [id],
          (res) => {
            Log.Console("获取详细任务成功", res.data.buildings[0].pens[0]);
            const newTask = getSafeValue(res.data, DEFAULT_TASK_VAL, true, [null, undefined]);
            List.push(newTask);
          },
          (res, toast) => {
            Log.Console("获取详细任务列表失败", res);
            toast("", res?.message || "获取任务列表失败！请检查网络！");
          }
        );
      }
    }
    setAllTaskList(BaseList);
    setTasksList(List);
  }, [API.reqTaskInfo, fetchData, setAllTaskList, setTasksList]);


  return useCallback(async () => {
    if (isLogin) {
      await fetchData(
        API.reqGetTask,
        [profile.id],
        (res) =>
          GetTaskDetail(res.data.list)
        ,
        (res, toast) => {
          toast("", res?.message || "获取任务列表失败！请检查网络！");
        }
      );
    }
  }, [API.reqGetTask, GetTaskDetail, fetchData, isLogin, profile.id]);
};
