import Header from "@/components/Header";
import Manage from "@/components/more/Manage";
import Report from "@/components/more/Report";
import { userSelector } from "@/stores";
import { StatusBar, View } from "react-native";
import { useSelector } from "react-redux";
import { useLogin } from "@/hooks/useLogin";
import Blank from "@/components/Blank";
import { NO_LOGIN_TIPS } from "@/settings";


const More = () => {
  const { profile } = useSelector(userSelector);
  const { hasToken } = useLogin();
  return (
    <>
      <View className="flex-1 bg-gray-50">
        <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
        <Header title={profile?.admin ? "管理" : "数据"} />
        {
          (hasToken && <Report />) ||
          <Blank tips={NO_LOGIN_TIPS} />
        }
      </View>
    </>
  );
};
// noinspection JSUnusedGlobalSymbols
export default More;
