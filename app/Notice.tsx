import { FC } from "react";
import { StatusBar, View, Text } from "react-native";
import BigHeader from "@/components/BigHeader";
import { APP_NAME } from "@/settings";
import MyPagesCard from "@/components/my/MyPagesCard";
import NoticeItem from "@/components/notice/NoticeItem";


type props = object;

const Notice: FC<props> = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
      <View className="flex-1 bg-white">
        <BigHeader title="公告"
                   info={<BigHeader.InfoText content={`查看{${APP_NAME}}系统公告`} />
                   }
        >
          <NoticeItem time={"2025-04-22"} content={"系统提示：识别系统全新升级，敬请使用！"}
                      containerStyle={{ marginTop: 30 }} />
          <NoticeItem time={"2025-04-22"} content={"过期提醒：任务一即将过期，请及时处理"} />
          <NoticeItem time={"2025-04-22"} content={"组织公告：抓紧完成上传任务一。"} />
        </BigHeader>
      </View>
    </>
  );
};
export default Notice;
