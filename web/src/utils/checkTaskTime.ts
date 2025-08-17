import dayjs from "dayjs";

export const checkTaskTime = (task: BaseTask | null) => {
  if (task) {
    const start = dayjs(task.startTime);
    const end = dayjs(task.endTime);
    const now = dayjs(Date.now());
    if (now.isAfter(start) && now.isBefore(end)) {
      return "during";
    } else if (now.isBefore(start)) {
      return "before";
    } else if (now.isAfter(end)) {
      return "after";
    }
  }
  return "null";
};
export const getTaskPrefixText = (task: BaseTask | null) => {
  const res = checkTaskTime(task);
  switch (res) {
    case "during":
      return ["当前", "var(--task-currentTask-title-prefix-bg-current)"];
    case "before":
      return ["未来", "var(--task-currentTask-title-prefix-bg-future)"];
    case "after":
      return ["历史", "var(--task-currentTask-title-prefix-bg-history)"];
    default:
      return ["无效", "var(--task-currentTask-title-prefix-bg-error)"];
  }
};
