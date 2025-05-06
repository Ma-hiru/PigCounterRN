import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { useSyncExternalStore } from "react";


dayjs.extend(duration);
export const countdownFormat = (time: number) => {
  return dayjs.duration(time, "milliseconds").format("HH时mm分ss秒");
};
export const useValidateTask = (task: BaseTask) => {
  const endTime = dayjs(task.endTime);
  const nowTime = dayjs(Date.now());
  const startTime = dayjs(task.startTime);
  const validation = useSyncExternalStore(
    (listener) => {
      const timer = setInterval(listener, 1000);
      return () => clearInterval(timer);
    },
    () => (startTime.isBefore(nowTime) && endTime.isAfter(nowTime))
  );
  const isOutdate = endTime.isBefore(nowTime);
  return { validation, startTime, endTime, isOutdate };
};
export const getCurrentTask = (taskList: Task[]) => {
  return taskList.reduce((pre, task) => {
    const endTime = dayjs(task.endTime);
    const nowTime = dayjs(Date.now());
    const startTime = dayjs(task.startTime);
    startTime.isBefore(nowTime) && endTime.isAfter(nowTime) && pre.push(task);
    return pre;
  }, [] as Task[]);
};
