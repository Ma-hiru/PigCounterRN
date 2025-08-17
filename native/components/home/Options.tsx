import { FC, memo, useEffect } from "react";
import { View, InteractionManager, StyleSheet } from "react-native";
import { Log } from "@/utils/logger";
import { getCurrentTask, getLastTaskInfo } from "@/utils/validateTask";
import { useTaskZustandStore } from "@/stores/zustand/task";
import { useShallow } from "zustand/react/shallow";
import { useUserZustandStore } from "@/stores/zustand/user";
import { useImmer } from "use-immer";
import OptionsButton from "@/components/home/OptionsButton";
import OptionsTask from "@/components/home/OptionsTask";
import OptionsNews from "@/components/home/OptionsNews";

type props = object;
const Options: FC<props> = () => {
  const { TasksList } = useTaskZustandStore(
    useShallow(state => ({
      TasksList: state.TasksList
    }))
  );
  const { isLogin } = useUserZustandStore(
    useShallow(state => ({
      isLogin: state.isLogin
    }))
  );
  Log.Console("HomeOptionsStart");
  const [LastCount, setLastCount] = useImmer({
    taskIndex: 0,
    buildingIndex: 0,
    penIndex: 0,
    penId: 0,
    buildingName: "",
    penName: ""
  });
  const [CurrentTask, setCurrentTask] = useImmer<Task[]>([]);
  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      const current = getCurrentTask(TasksList);
      const last = getLastTaskInfo(current);
      last && setLastCount(last);
      current && setCurrentTask(current);
    });
  }, [TasksList, setCurrentTask, setLastCount]);
  return (
    <>
      <View className="flex-1" style={ContainerStyle}>
        <OptionsButton LastCount={LastCount} CurrentTask={CurrentTask} isLogin={isLogin} />
        <View>
          <OptionsTask isLogin={isLogin} CurrentTask={CurrentTask} />
          <OptionsNews />
        </View>
      </View>
    </>
  );
};
export default memo(Options);

const {
  ContainerStyle
} = StyleSheet.create({
  ContainerStyle: {
    paddingLeft: 12,
    paddingRight: 12,
    position: "relative",
    top: -30,
    borderRadius: 15
  }
} as const);
