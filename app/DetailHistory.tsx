import { FC, useMemo } from "react";
import { useGetRouteParam } from "@/hooks/useGetRouteParam";
import { uploadSelector, useAppSelector } from "@/stores";
import { ScrollView, StatusBar, Text, View } from "react-native";
import { GlobalStyles } from "@/settings";
import { Shadow } from "react-native-shadow-2";
import GenerateTableRow from "@/components/more/GenerateTableRow";
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow
} from "@/components/ui/table";
import { useMyState } from "@/hooks/useMyState";
import BigHeader from "@/components/BigHeader";

type props = object;

const DetailHistory: FC<props> = () => {
  let [taskIds, Time] = useGetRouteParam<Record<keyof DetailHistoryRouteParams, string>, [number[], string]>((params) => {
    const data = params.taskId.split(",");
    return [data.map(Number), params.time];
  });
  const { TasksList } = useAppSelector(uploadSelector);
  const Total = useMyState({ countNum: 0, pensNum: 0 });
  const [currentTask, restTaskIds] = useMemo(() => {
    const restTaskIds: number[] = [];
    const currentTask: Task[] = [];
    //是否本地存在
    taskIds.forEach((needId) => {
      for (const task of TasksList) {
        if (task.id === needId) {
          currentTask.push(task);
        } else {
          restTaskIds.push(needId);
        }
      }
    });
    return [currentTask, restTaskIds];
  }, [TasksList, taskIds]);
  //TODO 根据restTaskIds请求非本地数据
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
      <BigHeader title="记录详情"
                 info={<BigHeader.InfoText content={`查看 {${Time}} 历史记录详细信息`} />
                 }
      />
      <ScrollView className="flex-1 bg-white">
        <View className="relative"
              style={{ paddingLeft: "5%", paddingRight: "5%", paddingTop: 30, paddingBottom: 30 }}>
          <Shadow style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%"
          }}>
            <Table className="w-full">
              <TableHeader>
                <TableRow className="flex-row justify-center">
                  {
                    ["楼栋", "栏舍", "数量"].map((name) =>
                      <TableHead {...PositionStyle} key={name}>
                        <Text className="font-bold"
                              style={{ color: GlobalStyles.ThemeColor1 }}>{name}</Text>
                      </TableHead>
                    )
                  }
                </TableRow>
              </TableHeader>
              <TableBody>
                {
                  currentTask.map((task: Task, taskIndex: number) => (
                    <GenerateTableRow task={task} taskIndex={taskIndex} key={taskIndex}
                                      total={Total} />
                  ))
                }
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableHead {...PositionStyle}>
                    <Text>总数</Text>
                  </TableHead>
                  <TableHead {...PositionStyle}>
                    <Text>{Total.get().pensNum}</Text>
                  </TableHead>
                  <TableHead {...PositionStyle}>
                    <Text>{Total.get().countNum}</Text>
                  </TableHead>
                </TableRow>
              </TableFooter>
            </Table>
          </Shadow>
        </View>
      </ScrollView>
    </>
  );
};
export default DetailHistory;
const PositionStyle = {
  useRNView: true,
  className: "flex-row justify-center"
};
