import TaskItem from "@/components/home/TaskItem";
import { uploadSelector, useAppSelector } from "@/stores";
import { FC } from "react";
import { View } from "react-native";

type props = object

const Task: FC<props> = () => {
  const { TasksList } = useAppSelector(uploadSelector);
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
export default Task;
