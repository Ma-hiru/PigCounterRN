import GenerateTableRow from "@/components/more/GenerateTableRow";
import { GlobalStyles } from "@/settings";
import { uploadSelector } from "@/stores";
import { FC, useState } from "react";
import { RefreshControl, ScrollView, View, Text } from "react-native";
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow
} from "@/components/ui/table";
import { useSelector } from "react-redux";
import { Shadow } from "react-native-shadow-2";
import { useMyState } from "@/hooks/useMyState";

type props = object
const Report: FC<props> = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [refreshing, setRefreshing] = useState(false);
  const { TasksList } = useSelector(uploadSelector);
  const Total = useMyState({ countNum: 0, pensNum: 0 });
  const onRefresh = async () => {
    setRefreshing(true);
    setRefreshing(false);
  };
  return (
    <>
      <ScrollView className="flex-1" refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={GlobalStyles.ThemeColor}
          colors={[GlobalStyles.ThemeColor1]}
        />
      }>
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
                  TasksList.map((task: Task, taskIndex: number) => (
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
export default Report;

const PositionStyle = {
  useRNView: true,
  className: "flex-row justify-center"
};
