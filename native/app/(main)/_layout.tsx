import { Tabs } from "expo-router";
import { memo } from "react";
import { TabsIcon } from "@/assets";
import { create_icon,screen_options } from "@/app/(main)/_layout_config";


const MainLayout = () => {
  return (
    <>
      <Tabs backBehavior="firstRoute" screenOptions={screen_options}>
        <Tabs.Screen name="Home" options={home_icon} />
        <Tabs.Screen name="Upload" options={upload_icon} />
        <Tabs.Screen name="More" options={more_icon} />
        <Tabs.Screen name="My" options={user_icon} />
      </Tabs>
    </>
  );
};
// noinspection JSUnusedGlobalSymbols
export default memo(MainLayout);


//icons
const home_icon = create_icon(
  TabsIcon.Home,
  TabsIcon.Home_Active,
  "首页"
);
const upload_icon = create_icon(
  TabsIcon.See,
  TabsIcon.See_Active,
  "计数",
  { bottom: 1.5, right: 0 });
const more_icon = create_icon(
  TabsIcon.Data,
  TabsIcon.Data_Active,
  "数据",
  { right: 0 }
);
const user_icon = create_icon(
  TabsIcon.User,
  TabsIcon.User_Active,
  "我的",
  { right: 0.5 }
);


