import company from "@/assets/images/my/company.svg";
import feedback from "@/assets/images/my/feedback.svg";
import history from "@/assets/images/my/history.svg";
import logout from "@/assets/images/my/logout.svg";
import settings from "@/assets/images/my/settings.svg";
import userInfo from "@/assets/images/my/userInfo.svg";
import MyPagesCardIcon from "@/components/my/MyPagesCardIcon";
import MyPagesCardItem from "@/components/my/MyPagesCardItem";
import { useLogin } from "@/hooks/useLogin";
import { goToPages } from "@/utils/goToPages";
import { type Router, useRouter } from "expo-router";
import { FC, memo } from "react";
import { StyleSheet, Text, View } from "react-native";
import MyPagesCard from "./MyPagesCard";

interface props {
  /* empty */
}

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

const MyPagesOptions: FC<props> = () => {
  const router = useRouter();
  const { handleLogout } = useLogin();
  return (
    <>
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
              <MyPagesCardItem text={"退出登录"} img={logout} iconSize={22}
                               onPress={handleLogout} />
            </View>
          </MyPagesCard>
        </View>
      </View>
    </>
  );
};
export default memo(MyPagesOptions);
const styles = StyleSheet.create({
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
