import { FC, memo } from "react";
import { View } from "react-native";
import IconOptionItem from "@/components/home/IconOptionItem";
import SingleIcon from "@/assets/images/home/single.svg";
import { Log } from "@/utils/logger";
import { NO_ACTIVE_TASK, NO_LOGIN_TIPS } from "@/settings.app";
import { goToPages } from "@/utils/goToPages";
import CountIcon from "@/assets/images/home/count.svg";
import NoticeIcon from "@/assets/images/home/notice.svg";
import PigIcon from "@/assets/images/home/pig.svg";
import { useRouter } from "expo-router";
import { useToast } from "@/components/ui/toast";

const OptionsButton: FC<props> = ({ CurrentTask, LastCount, isLogin }) => {
  const router = useRouter();
  const toast = useToast();
  return (
    <>
      <View className="flex-row justify-between">
        <IconOptionItem
          title="单次计数"
          icon={SingleIcon}
          iconStyle={{ width: 38, height: 38 }}
          onPress={() => {
            if (!isLogin) Log.Message(toast, "", NO_LOGIN_TIPS);
            else goToPages(router, {
              pathname: "/UploadFiles",
              params: {
                title: "单次计数",
                taskIndex: [0, 0, 0],
                //TODO 考虑是否有效
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
          iconStyle={{ width: 40, height: 40 }}
        />
      </View>
      <View className="flex-row justify-between">
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
            if (CurrentTask.length === 0) Log.Message(toast, "", NO_ACTIVE_TASK);
            else goToPages(router, {
              pathname: "/UploadFiles",
              params: {
                title: `${LastCount.buildingName} · ${LastCount.penName}`,
                taskIndex: [LastCount.taskIndex, LastCount.buildingIndex, LastCount.penIndex],
                penId: LastCount.penId,
                once: "false"
              }  satisfies  UploadFilesRouteParams
            }, "MOVE");
          }}
        />
      </View>
    </>
  );
};

export default memo(OptionsButton);

interface props {
  CurrentTask: Task[],
  LastCount: {
    taskIndex: number,
    buildingIndex: number,
    penIndex: number,
    penId: number,
    buildingName: string,
    penName: string
  },
  isLogin: boolean
}
