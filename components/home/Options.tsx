import { FC, memo, useEffect } from "react";
import { View, InteractionManager, Text } from "react-native";
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
import { Log } from "@/utils/logger";
import { newsSelector } from "@/stores/slice/newsSlice";
import News from "@/components/home/News";
import { useMyState } from "@/hooks/useMyState";
import { getCurrentTask } from "@/utils/validateTask";
import { useToast } from "@/components/ui/toast";
import { NO_ACTIVE_TASK, NO_LOGIN_TIPS } from "@/settings";
import { Image } from "expo-image";
import ForbidIcon from "@/assets/images/forbid.svg";
import RestIcon from "@/assets/images/home/rest.svg";
import { useLogin } from "@/hooks/useLogin";

type props = object;
const Options: FC<props> = () => {
  const router = useRouter();
  const { hasToken } = useLogin();
  const { TasksList } = useSelector(uploadSelector);
  const { NewsList } = useSelector(newsSelector);
  Log.Console("HomeOptionsStart");
  const LastCount = useMyState({
    taskIndex: 0,
    buildingIndex: 0,
    penIndex: 0,
    penId: 0,
    buildingName: "",
    penName: ""
  });
  const CurrentTask = getCurrentTask(TasksList);
  const toast = useToast();
  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      for (const [taskIndex, task] of CurrentTask.entries()) {
        for (const [buildingIndex, building] of task.buildings.entries()) {
          for (const [penIndex, pen] of building.pens.entries()) {
            if (pen.penNum === -1) {
              //TODO Name
              return LastCount.set({
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
    // eslint-disable-next-line
  }, [TasksList]);
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
            onPress={() => {
              if (!hasToken) {
                return Log.Message(toast, "", NO_LOGIN_TIPS);
              }
              goToPages(router, {
                pathname: "/UploadFiles",
                params: {
                  title: `单次计数`,
                  taskIndex: [0, 0, 0],
                  penId: 114514,
                  once: "true"
                } satisfies  UploadFilesRouteParams
              }, "MOVE");
            }}
          />
          <IconOptionItem
            title="查看数据"
            icon={CountIcon}
            onPress={goToPages(router, "/(main)/More", "FN")}
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
            icon={PigIcon}
            iconStyle={{ width: 40, height: 40 }}
            onPress={() => {
              if (CurrentTask.length === 0) {
                return Log.Message(toast, "", NO_ACTIVE_TASK);
              }
              goToPages(router, {
                pathname: "/UploadFiles",
                params: {
                  title: `楼栋${LastCount.get().buildingName} · 栏舍${LastCount.get().penName}`,
                  taskIndex: [LastCount.get().taskIndex, LastCount.get().buildingIndex, LastCount.get().penIndex],
                  penId: LastCount.get().penId
                }
              }, "MOVE");
            }}
          />
        </View>
        <View>
          <MyPagesCard cardStyle={{ marginBottom: 15, paddingBottom: 15 }}
                       title={"今日任务"}>
            <MyPagesCard.CanPress
              containerStyle={{ paddingLeft: 5, paddingRight: 5 }}
              onPress={goToPages(router, "/Upload", "FN")}
            >
              <Task TasksList={CurrentTask} />
            </MyPagesCard.CanPress>
            {(!hasToken) &&
              <View style={{
                padding: 10,
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row"
              }}>
                <Image source={ForbidIcon} style={{ width: 20, height: 20, marginRight: 5 }} />
                <Text
                  style={{
                    fontFamily: "baigetianxingtiRegular" as Fonts,
                    fontSize: 16,
                    lineHeight: 16
                  }}>
                  {NO_LOGIN_TIPS}
                </Text>
              </View>
            }
            {(hasToken && CurrentTask.length === 0) &&
              <View style={{
                padding: 10,
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row"
              }}>
                <Image source={RestIcon} style={{ width: 25, height: 25, marginRight: 5 }} />
                <Text
                  style={{
                    fontSize: 18,
                    lineHeight: 26,
                    fontWeight: "normal"
                  }}>
                  {NO_ACTIVE_TASK}
                </Text>
              </View>
            }
          </MyPagesCard>
          <MyPagesCard cardStyle={{ marginBottom: 15 }} title={"每日一闻"}>
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
