import TaskItem from "@/components/home/TaskItem";
import { uploadSelector, useAppSelector } from "@/stores";
import { FC, memo } from "react";
import { View } from "react-native";

type props = {
  TasksList: TaskList
}

const Task: FC<props> = ({ TasksList }) => {
  return (
    <>
      <View>
        {
          TasksList.map((item: Task, index: number) =>
            <TaskItem task={item} key={index} taskIndex={index} />
          )
        }
      </View>
    </>
  );
};
export default memo(Task);
