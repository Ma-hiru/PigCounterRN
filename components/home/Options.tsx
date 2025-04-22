import { FC, memo, useEffect } from "react";
import { View, InteractionManager } from "react-native";
import MyPagesCard from "@/components/my/MyPagesCard";
import SingleIcon from "@/assets/images/home/single.svg";
import PigIcon from "@/assets/images/home/pig.svg";
import NoticeIcon from "@/assets/images/home/notice.svg";
import CountIcon from "@/assets/images/home/count.svg";
import Task from "@/components/home/Task";
import IconOptionItem from "@/components/home/IconOptionItem";
import { goToPages } from "@/utils/goToPages";
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";
import { uploadSelector } from "@/stores";
import { useImmer } from "use-immer";
import logger from "@/utils/logger";
import { newsSelector } from "@/stores/slice/newsSlice";
import News from "@/components/home/News";
import { UploadFilesRouteParams } from "@/types/route";

type props = object;
const Options: FC<props> = () => {
  const router = useRouter();
  const { TasksList } = useSelector(uploadSelector);
  const { NewsList } = useSelector(newsSelector);
  logger("console", "OptionsStart");
  const [LastCount, setLastCount] = useImmer({
    taskIndex: 0,
    buildingIndex: 0,
    penIndex: 0,
    penId: 0,
    buildingName: "",
    penName: ""
  });
  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      for (const [taskIndex, task] of TasksList.entries()) {
        for (const [buildingIndex, building] of task.buildings.entries()) {
          for (const [penIndex, pen] of building.pens.entries()) {
            if (pen.penNum === -1) {
              //TODO Name
              return setLastCount({
                taskIndex,
                buildingIndex,
                penIndex,
                buildingName: String(building.buildingId),
                penName: String(pen.penId),
                penId: pen.penId
              });
            }
          }
        }
      }
    });
  }, [TasksList, setLastCount]);
  return (
    <>
      <View className=" flex-1 bg-gray-50" style={{
        paddingLeft: 12,
        paddingRight: 12,
        position: "relative",
        top: -30,
        borderRadius: 15
      }}>
        <View className="flex-row justify-evenly">
          <IconOptionItem
            title="单次计数"
            icon={SingleIcon}
            iconStyle={{ width: 38, height: 38 }}
            onPress={goToPages(router, {
              pathname: "/UploadFiles",
              params: {
                title: `单次计数`,
                taskIndex: [0, 0, 0],
                penId: 114514,
                once: "true"
              } satisfies  UploadFilesRouteParams
            }, "FN")}
          />
          <IconOptionItem
            title="查看数据"
            icon={PigIcon}
            onPress={goToPages(router,"/(main)/More","FN")}
            iconStyle={{ width: 40, height: 40 }} />
        </View>
        <View className="flex-row justify-evenly">
          <IconOptionItem
            title="查看公告"
            icon={NoticeIcon}
            iconStyle={{ width: 40, height: 40 }}
            onPress={goToPages(router, "/Notice", "FN")}
          />
          <IconOptionItem
            title="开始计数"
            icon={CountIcon}
            iconStyle={{ width: 40, height: 40 }}
            onPress={goToPages(router, {
              pathname: "/UploadFiles",
              params: {
                title: `楼栋${LastCount.buildingName} · 栏舍${LastCount.penName}`,
                taskIndex: [LastCount.taskIndex, LastCount.buildingIndex, LastCount.penIndex],
                penId: LastCount.penId
              }
            }, "FN")}
          />
        </View>
        <View>
          <MyPagesCard cardStyle={{ marginBottom: 15, paddingBottom: 15 }}
                       title={"今日任务"}>
            <Task TasksList={TasksList} />
          </MyPagesCard>

          <MyPagesCard cardStyle={{ marginBottom: 15 }} title={"热门新闻"}>
            {
              NewsList.map((news) =>
                <News news={news} key={news.id} />)
            }
          </MyPagesCard>
        </View>
      </View>
    </>
  );
};
export default memo(Options);
