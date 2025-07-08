import { FC, useEffect, useMemo } from "react";
import { useGetRouteParam } from "@/hooks/useGetRouteParam";
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
import BigHeader from "@/components/BigHeader";
import { useFetchData } from "@/utils/fetchData";
import { useReactive } from "ahooks";
import { useTaskZustandStore } from "@/stores/zustand/task";
import { useShallow } from "zustand/react/shallow";
import { useImmer } from "use-immer";

type props = object;

const DetailHistory: FC<props> = () => {
  let [taskIds, Time] = useGetRouteParam<Record<keyof DetailHistoryRouteParams, string>, [number[], string]>((params) => {
    const data = params.taskId.split(",");
    return [data.map(Number), params.time];
  });
  const { TasksList } = useTaskZustandStore(
    useShallow(
      state => ({
        TasksList: state.TasksList
      })
    )
  );
  const [Total, setTotal] = useImmer({ countNum: 0, pensNum: 0 });
  const [currentTask, restTaskIds] = useMemo(() => {
    const currentTask: Task[] = [];
    const restTaskIds: number[] = [];
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
  const restTask = useReactive<Task[]>([]);
  const { fetchData, API } = useFetchData();
  useEffect(() => {
    const allRestTaskInfo: Task[] = [];
    restTaskIds.forEach(async (id) => {
      await fetchData(
        API.reqTaskInfo,
        [id],
        (res) => {
          allRestTaskInfo.push(res.data);
        },
        (res, toast) => {
          toast("", res?.message || "获取任务列表失败！请检查网络！");
        }
      );
      restTask.push(...allRestTaskInfo);
    });
  }, [API.reqTaskInfo, fetchData, restTask, restTaskIds]);
  const restTotal = useReactive<{ countNum: number, pensNum: number }[]>([]);
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
      <BigHeader
        title="记录详情"
        info={<BigHeader.InfoText content={`查看 {${Time}} 历史记录详细信息`} />
        }
      />
      <ScrollView className="flex-1 bg-white">
        <View className="relative"
              style={{ paddingLeft: "5%", paddingRight: "5%", paddingTop: 30, paddingBottom: 30 }}>
          {
            currentTask.length > 0 &&
            <Shadow style={{
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
                      <GenerateTableRow
                        task={task}
                        taskIndex={taskIndex}
                        key={taskIndex}
                        total={Total}
                        setTotal={setTotal}
                      />
                    ))
                  }
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableHead {...PositionStyle}>
                      <Text>总数</Text>
                    </TableHead>
                    <TableHead {...PositionStyle}>
                      <Text>{Total.pensNum}</Text>
                    </TableHead>
                    <TableHead {...PositionStyle}>
                      <Text>{Total.countNum}</Text>
                    </TableHead>
                  </TableRow>
                </TableFooter>
              </Table>
            </Shadow>
          }
          {
            restTask.length > 0 && restTask.map((task: Task, taskIndex: number) => <Shadow style={{
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
                  <GenerateTableRow
                    task={task}
                    taskIndex={taskIndex}
                    key={taskIndex}
                    isHistory={true}
                    restTotal={restTotal}
                  />
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableHead {...PositionStyle}>
                      <Text>总数</Text>
                    </TableHead>
                    <TableHead {...PositionStyle}>
                      <Text>{restTotal[taskIndex].pensNum}</Text>
                    </TableHead>
                    <TableHead {...PositionStyle}>
                      <Text>{restTotal[taskIndex].countNum}</Text>
                    </TableHead>
                  </TableRow>
                </TableFooter>
              </Table>
            </Shadow>)
          }
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
