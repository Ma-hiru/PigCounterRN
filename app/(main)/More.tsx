import Header from "@/components/Header";
import Manage from "@/components/more/Manage";
import Report from "@/components/more/Report";
import { userSelector } from "@/stores";
import { StatusBar, View } from "react-native";
import { useSelector } from "react-redux";


const More = () => {
  const { profile } = useSelector(userSelector);
  return (
    <>
      <View className="flex-1 bg-gray-50">
        <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
        <Header title={profile?.admin ? "管理" : "数据"} />
        {
          profile?.admin ? <Manage /> : <Report />
        }
      </View>
    </>
  );
};
// noinspection JSUnusedGlobalSymbols
export default More;
