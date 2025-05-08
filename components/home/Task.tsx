import TaskItem from "@/components/home/TaskItem";
import { FC, memo } from "react";
import { View } from "react-native";
import { GlobalStyles } from "@/settings.theme";

type props = {
  TasksList: BaseTask[];
  HasBlur?: boolean;
}

const Task: FC<props> = ({ TasksList, HasBlur }) => {
  return (
    <>
      <View style={HasBlur ? { backgroundColor: GlobalStyles.BlurBgCardColor } : undefined}>
        {
          TasksList.map((item, index) =>
            <TaskItem task={item} key={index} taskIndex={index} HasBlur={HasBlur} />
          )
        }
      </View>
    </>
  );
};
export default memo(Task);
