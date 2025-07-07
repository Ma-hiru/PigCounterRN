import Header from "@/components/Header";
import Report from "@/components/more/Report";
import { StatusBar, View } from "react-native";
import Blank from "@/components/Blank";
import { NO_LOGIN_TIPS } from "@/settings";
import { useUserZustandStore } from "@/stores/zustand/user";
import { useShallow } from "zustand/react/shallow";


const More = () => {
  const { profile, isLogin } = useUserZustandStore(
    useShallow(
      state => ({
        profile: state.profile,
        isLogin: state.isLogin
      })
    )
  );
  return (
    <>
      <View className="flex-1 bg-gray-50">
        <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
        <Header title={profile?.admin ? "管理" : "数据"} />
        {
          (isLogin() && <Report />) ||
          <Blank tips={NO_LOGIN_TIPS} />
        }
      </View>
    </>
  );
};
// noinspection JSUnusedGlobalSymbols
export default More;
