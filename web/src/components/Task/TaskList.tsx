import { FC, memo } from "react";
import TaskItem from "@/components/Task/TaskItem.tsx";
import "./TaskList.scss";
import Logger from "@/utils/logger.ts";

type props = {
  data: BaseTask[];
  selectTask: (task: Task) => void;
}
const TaskList: FC<props> = ({ data, selectTask }) => {
  Logger.Console("TaskList", data);
  return (
    <div id="TaskList">
      {
        data.length !== 0 &&
        data.map((item, index) => {
          return <TaskItem task={item} key={index} selectTask={selectTask} />;
        })
      }
      {
        data.length === 0 && (
          <div className="w-full h-full flex justify-center items-center">
            <img src="/blank_1.svg" className="w-[1.5rem] mr-1" alt={"no data"} />
            暂无数据
          </div>
        )
      }
    </div>
  );
};

export default memo(TaskList);
