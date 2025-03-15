import { StatusBar } from "expo-status-bar";
import { View, StyleSheet, Pressable, Text } from "react-native";
import { Image } from "expo-image";
import headBg from "@/assets/images/my/user_bg.webp";
import defaultAvatar from "@/assets/images/my/defaultAvatar.png";
import checkIcon from "@/assets/images/my/check.svg";
import { useState } from "react";
import { setImageScale } from "@/utils/setImageScale";
import MyPagesCard from "@/components/MyPagesCard";
import { Button } from "@/components/ui/button";
import MyPagesCardIcon from "@/components/MyPagesCardIcon";
import company from "@/assets/images/my/company.svg";
import history from "@/assets/images/my/history.svg";
import userInfo from "@/assets/images/my/userInfo.svg";
import feedback from "@/assets/images/my/feedback.svg";
import { useRouter, type Router } from "expo-router";
import { goToPages } from "@/utils/goToPages";

const CardIconList = [
  {
    text: "组织信息",
    img: company,
    onPress: (router: Router) => goToPages(router, "/CompanyInfo", "FN")
  },
  {
    text: "个人信息",
    img: userInfo,
    onPress: (router: Router) => goToPages(router, "/UserInfo", "FN")
  },
  {
    text: "历史记录",
    img: history,
    onPress: (router: Router) => goToPages(router, "/HistoryInfo", "FN")
  },
  {
    text: "问题反馈",
    img: feedback,
    onPress: (router: Router) => goToPages(router, "/Feedback", "FN")
  }
];
export default function My() {
  const [bgScale, setBgScale] = useState(1);
  const [avatarScale, setAvatarScale] = useState(1);
  const router = useRouter();
  return (
    <>
      <StatusBar style="dark" backgroundColor="transparent" translucent={true} />
      <View className="flex-1">
        <View className="relative">
          <Image source={headBg}
                 style={{ ...styles.UserBg, aspectRatio: bgScale }}
                 onLoad={setImageScale(bgScale, setBgScale)}
          />
          <View
            className="flex justify-center items-center w-screen -translate-x-1/2  -translate-y-1/2"
            style={styles.UserBox}>
            <Image source={defaultAvatar}
                   style={{ ...styles.UserAvatar, aspectRatio: avatarScale }}
                   onLoad={setImageScale(avatarScale, setAvatarScale)}
            />
            <Text style={styles.UserNameText}>
              {"点击登录"}
            </Text>
            <View className="w-full flex justify-center items-center flex-row mt-1">
              <Image source={checkIcon} style={styles.CheckIcon} />
              <Text style={styles.UserInfoText}>
                {"湘乡市东郊乡王卫养猪场"}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.InfoCardBox}>
          <View style={styles.InfoCard}>
            <MyPagesCard cardStyle={{ marginBottom: 10 }} contentStyle={styles.InfoCardStyle}>
              {
                CardIconList.map((item) =>
                  (
                    <MyPagesCardIcon text={item.text} img={item.img}
                                     key={item.text}
                                     onPress={item.onPress(router)} />
                  )
                )
              }
            </MyPagesCard>
            <MyPagesCard cardStyle={{ marginBottom: 10 }} title={"今日任务"}>
              <View className="mb-4">
                <Text style={{ textAlign: "center" }}>暂无任务</Text>
              </View>
            </MyPagesCard>
            <MyPagesCard title={"未处理上传"}>
              <View className="mb-4">
                <Text style={{ textAlign: "center" }}>暂无数据</Text>
              </View>
            </MyPagesCard>
          </View>
          <View>
            <Button
              className="w-full mb-4"
              size="lg"
              variant="outline"
              action="negative"
            >
              <Pressable className="flex-1 justify-center items-center"
                         onStartShouldSetResponderCapture={() => true}>
                {
                  ({ pressed }) => (
                    <Text
                      style={pressed ? styles.LogoutTextActive : styles.LogoutText}>
                      退出登录
                    </Text>
                  )
                }
              </Pressable>
            </Button>
          </View>
        </View>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  UserBg: {
    width: "100%",
    // @ts-ignore
    contentFit: "cover"
  },
  UserAvatar: {
    width: 65,
    contentFit: "cover",
    borderRadius: 99999,
    borderWidth: 2,
    borderColor: "#fff",
    overflow: "hidden"
  },
  UserBox: {
    position: "absolute",
    top: "50%",
    left: "50%"
  },
  UserNameText: {
    fontWeight: "600",
    marginTop: 10,
    fontSize: 18,
    color: "#ffffff"
  },
  UserInfoText: {
    fontSize: 14,
    lineHeight: 20,
    color: "#222"
  },
  CheckIcon: {
    width: 18,
    height: 18
  },
  InfoCardBox: {
    flex: 1,
    paddingLeft: 12,
    paddingRight: 12,
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  },
  InfoCard: {
    position: "relative",
    top: -20
  },
  LogoutText: {
    color: "red"
  },
  LogoutTextActive: {
    color: "#fc7070"
  },
  InfoCardStyle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  },
  TaskCardStyle: {},
  UnhandledUploadCardStyle: {}
});
