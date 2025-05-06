import TaskItem from "@/components/home/TaskItem";
import { FC, memo } from "react";
import { View } from "react-native";
import { GlobalStyles } from "@/settings.theme";

type props = {
  TasksList: BaseTask[]
}

const Task: FC<props> = ({ TasksList }) => {
  return (
    <>
      <View style={{ backgroundColor: GlobalStyles.BlurBgCardColor }}>
        {
          TasksList.map((item, index) =>
            <TaskItem task={item} key={index} taskIndex={index} />
          )
        }
      </View>
    </>
  );
};
export default memo(Task);
