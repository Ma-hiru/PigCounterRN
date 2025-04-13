import Header from "@/components/Header";
import Manage from "@/components/more/Manage";
import Report from "@/components/more/Report";
import { userSelector } from "@/stores";
import { memo } from "react";
import { StatusBar } from "react-native";
import { useSelector } from "react-redux";


const More = () => {
  const { profile } = useSelector(userSelector);

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
      <Header title={profile?.admin ? "管理" : "上报"} />
      {
        profile?.admin ? <Manage /> : <Report />
      }
    </>
  );
};
// noinspection JSUnusedGlobalSymbols
export default memo(More);
