import CountDown from "@/components/upload/CountDown";
import { GlobalStyles } from "@/settings";
import { countdownFormat, useValidateTask } from "@/utils/validateTask";
import { FC, memo } from "react";
import { StyleSheet, Text, View } from "react-native";

interface props {
  task: Task;
  taskIndex: number;
}

const TaskItem: FC<props> = ({ task, taskIndex }) => {
  const { validation, endTime } = useValidateTask(task);
  return (
    <>
      <View style={styles.Header} className="mt-4">
        <View className="justify-between flex-row w-full items-center">
          <View style={styles.Head}>
            <Text style={styles.Tags}>任务</Text>
            <Text style={{ ...styles.HeadText, ...styles.HeadTitle }}
                  className="text-2xl font-bold justify-center items-center">
              编号 {taskIndex + 1}
            </Text>
          </View>
          <View>
            {
              validation ?
                <Text
                  style={{ ...styles.HeadText, textAlign: "left",  }}>
                  <CountDown endTime={endTime.getTime()} format={countdownFormat} />
                </Text> :
                <Text style={{
                  ...styles.HeadText,
                  color: validation ? GlobalStyles.PositiveColor : GlobalStyles.ErrorColor,
                  textAlign: "left"
                }}>
                  未开放
                </Text>
            }
          </View>
        </View>
      </View>
    </>
  );
};
export default memo(TaskItem);
const styles = StyleSheet.create({
  HeadText: {
    textAlign: "left",
    fontWeight: 500,
    color: GlobalStyles.UploadCardColor,
    width: "auto"
  },
  HeadTitle: {
    textAlign: "left"
  },
  Tags: {
    backgroundColor: GlobalStyles.ThemeColor,
    color: "#fff",
    padding: 2,
    fontWeight: 500,
    marginRight: 5
  },
  Head: {
    justifyContent: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    width: "auto"
  },
  Header: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    width: "100%"
  }
});
