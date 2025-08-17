import { FC, memo } from "react";
import { View, Text } from "react-native";
import MyPagesCard from "@/components/my/MyPagesCard";
import PressFeedback from "@/components/animate/PressFeedback";
import { goToPages } from "@/utils/goToPages";
import Task from "@/components/home/Task";
import { Image } from "expo-image";
import ForbidIcon from "@/assets/images/forbid.svg";
import { NO_ACTIVE_TASK, NO_LOGIN_TIPS } from "@/settings.app";
import RestIcon from "@/assets/images/home/rest.svg";
import { useRouter } from "expo-router";

const OptionsTask: FC<props> = ({ isLogin, CurrentTask }) => {
  const router = useRouter();
  return (
    <>
      {/*任务*/}
      <MyPagesCard cardStyle={{ marginBottom: 15, paddingBottom: 15 }} title={"今日任务"}>
        <PressFeedback
          containerStyle={{ paddingLeft: 5, paddingRight: 5 }}
          onPress={goToPages(router, "/Upload", "FN")}
        >
          <Task TasksList={CurrentTask} HasBlur={false} />
        </PressFeedback>
        <PressFeedback>
          {(!isLogin) &&
            <View style={{
              padding: 10,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row"
            }}>
              <Image source={ForbidIcon} style={{ width: 25, height: 25, marginRight: 5 }} />
              <Text
                style={{
                  fontSize: 16,
                  lineHeight: 20
                }}>
                {NO_LOGIN_TIPS}
              </Text>
            </View>
          }
          {(isLogin && CurrentTask.length === 0) &&
            <View style={{
              padding: 10,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row"
            }}>
              <Image source={RestIcon} style={{ width: 25, height: 25, marginRight: 5 }} />
              <Text
                style={{
                  fontSize: 14,
                  lineHeight: 26,
                  fontWeight: "normal"
                }}>
                {NO_ACTIVE_TASK}
              </Text>
            </View>
          }
        </PressFeedback>
      </MyPagesCard>
    </>
  );
};

export default memo(OptionsTask);

interface props {
  CurrentTask: Task[],
  isLogin: boolean
}
