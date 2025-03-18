import { StatusBar } from "expo-status-bar";
import { View, StyleSheet, Text } from "react-native";
import { Image } from "expo-image";
import headBg from "@/assets/images/my/user_bg.webp";
import defaultAvatar from "@/assets/images/my/defaultAvatar.png";
import checkIcon from "@/assets/images/my/check.svg";
import { memo, useState } from "react";
import { setImageScale } from "@/utils/setImageScale";
import MyPagesCard from "@/components/MyPagesCard";
import MyPagesCardIcon from "@/components/MyPagesCardIcon";
import company from "@/assets/images/my/company.svg";
import history from "@/assets/images/my/history.svg";
import userInfo from "@/assets/images/my/userInfo.svg";
import feedback from "@/assets/images/my/feedback.svg";
import logout from "@/assets/images/my/logout.svg";
import settings from "@/assets/images/my/settings.svg";
import { useRouter, type Router } from "expo-router";
import { goToPages } from "@/utils/goToPages";
import MyPagesCardItem from "@/components/MyPagesCardItem";
import { useDispatch } from "react-redux";
import { useUserStore } from "@/stores";
import { DEFAULT_MY_BG_SCALE } from "@/settings";

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
const MyFC = () => {
  const [bgScale, setBgScale] = useState(DEFAULT_MY_BG_SCALE);

  const router = useRouter();
  const dispatch = useDispatch();
  const { setToken } = useUserStore.actions;
  const handleLogout = () => {
    dispatch(setToken(""));
    goToPages(router, "/Login", "MOVE");
  };
  return (
    <>
      <StatusBar style="dark" backgroundColor="transparent" translucent={true} />
      <View className="flex-1">
        <View className="relative">
          <Image source={headBg}
                 style={{ ...styles.UserBg, aspectRatio: bgScale }}
                 onLoad={setImageScale(bgScale, setBgScale)}
                 contentFit="contain"
          />
          <View
            className="flex justify-center items-center w-screen -translate-x-1/2  -translate-y-1/2"
            style={styles.UserBox}>
            <Image source={defaultAvatar}
                   style={styles.UserAvatar }
                   contentFit="cover"
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
                                     onPress={item.onPress(router)}
                    />
                  )
                )
              }
            </MyPagesCard>
            <MyPagesCard cardStyle={{ marginBottom: 10 }} title={"今日任务"}>
              <View className="mb-4">
                <Text style={{ textAlign: "center" }}>暂无任务</Text>
              </View>
            </MyPagesCard>
            <MyPagesCard cardStyle={{ marginBottom: 10 }} title={"未处理上传"}>
              <View className="mb-4">
                <Text style={{ textAlign: "center" }}>暂无数据</Text>
              </View>
            </MyPagesCard>
            <MyPagesCard title={"更多"}>
              <View className="mb-4">
                <MyPagesCardItem text={"设置"} img={settings} iconSize={25}
                                 onPress={goToPages(router, "/Settings", "FN")} />
                <MyPagesCardItem text={"退出登录"} img={logout} iconSize={22} onPress={handleLogout}/>
              </View>
            </MyPagesCard>
          </View>
        </View>
      </View>
    </>
  );
};
const My = memo(MyFC);
export default My;
const styles = StyleSheet.create({
  UserBg: {
    // width: "100%",
  },
  UserAvatar: {
    width: 65,
    height: 65,
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
