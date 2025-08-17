import { FC, memo, useEffect, useState } from "react";
import { getTaskCount } from "@/utils/getTaskCount.ts";
import { useDeviceSizeReact } from "@/hooks/useDeviceSize.ts";
import { useDarkModeReact } from "@/hooks/useDarkMode.ts";
import { getTaskPrefixText } from "@/utils/checkTaskTime.ts";
import { useReactive } from "ahooks";
import { useFetchDataReact } from "@/hooks/useFetchData.ts";
import Logger from "@/utils/logger.ts";
import dayjs from "dayjs";

type props = {
  task: BaseTask;
  selectTask: (task: Task) => void;
};

const Prefix: FC<{ task: BaseTask | null }> = ({ task }) => {
  const [text, bgColor] = getTaskPrefixText(task);
  return (
    <span className="task-title-prefix" style={{
      background: bgColor,
      color: "var(--task-currentTask-title-prefix-color)"
    }}>
      {text}
    </span>
  );
};

const TaskItem: FC<props> = ({ task, selectTask }) => {
  Logger.Console("ListTaskItem", task);
  const total = useReactive({ count: 0, manualCount: 0 });
  const [detailTask, setDetailTask] = useState<Task>();
  const { fetchData, API } = useFetchDataReact();
  useEffect(() => {
    if (!detailTask) {
      fetchData(
        API.reqGetTaskDetail,
        [task.id],
        (res) => {
          Logger.Console("Detail", res);
          const { count, manualCount } = getTaskCount(res.data);
          total.manualCount = count;
          total.count = manualCount;
          setDetailTask(res.data);
        },
        (res) => {
          Logger.Message.Error(res?.message || "请求详细任务出错！");
        }
      ).then();
    }
  }, [API.reqGetTaskDetail, detailTask, fetchData, task.id, total]);
  const isMobile = useDeviceSizeReact("lg", "max");
  const [isDark] = useDarkModeReact();
  return (
    <>
      <div className={isDark ? "task-card btn btn-outline" : "task-card btn"}>
        <div className="task-item" onClick={() => {
          detailTask && selectTask(detailTask);
          !detailTask && Logger.Message.Info("该任务详情获取失败");
        }}>
          <div className="task-title">
            <Prefix task={task} />
            <span className="task-title-name">
              {task?.taskName || `任务(${task.id})`}
            </span>
            <div className="task-title-count space-x-2">
              {
                !isMobile &&
                <>
                  <span className="text-ellipsis">
                    识别总数：{total.count}
                  </span>
                  <span className="text-ellipsis">
                    人工确认：{total.manualCount}
                  </span>
                </>
              }
            </div>
          </div>
          <div className="task-content flex flex-row justify-between items-center mt-1">
            <span></span>
            <span>{dayjs(task.startTime).format("YYYY-MM-DD HH:mm")}~{dayjs(task.endTime).format("YYYY-MM-DD HH:mm")}</span>
          </div>
        </div>
      </div>
    </>
  );
};
export default memo(TaskItem);
