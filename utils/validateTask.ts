import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { useSyncExternalStore } from "react";


dayjs.extend(duration);
export const countdownFormat = (time: number) => {
  return dayjs.duration(time, "milliseconds").format("HH时mm分ss秒");
};
export const useValidateTask = (task: Task) => {
  const endTime = dayjs(task.endTime).toDate();
  const startTime = dayjs(task.startTime).toDate();
  const validation = useSyncExternalStore(
    (listener) => {
      const timer = setInterval(listener, 1000);
      return () => clearInterval(timer);
    },
    () => (startTime.getTime() <= Date.now() && Date.now() <= endTime.getTime())
  );
  return { validation, startTime, endTime };
};
