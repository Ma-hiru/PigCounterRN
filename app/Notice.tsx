import { FC } from "react";
import { StatusBar, View, Text } from "react-native";
import BigHeader from "@/components/BigHeader";
import { APP_NAME } from "@/settings";
import MyPagesCard from "@/components/my/MyPagesCard";


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
          <MyPagesCard
            cardStyle={{ marginBottom: 10, paddingBottom: 15, marginTop: 40 }}
            title={"2025-04-22"}
          >
            <View className="justify-end">
              <Text>系统提示：识别系统全新升级，敬请使用！</Text>
            </View>
          </MyPagesCard>
          <MyPagesCard
            cardStyle={{ marginBottom: 10, paddingBottom: 15, marginTop: 15 }}
            title={"2025-04-22"}
          >
            <View className="justify-end">
              <Text>过期提醒：任务一即将过期，请及时处理</Text>
            </View>
          </MyPagesCard>
          <MyPagesCard
            cardStyle={{ marginBottom: 10, paddingBottom: 15, marginTop: 15 }}
            title={"2025-04-22"}
          >
            <View className="justify-end">
              <Text>组织公告：抓紧完成上传任务一。</Text>
            </View>
          </MyPagesCard>
        </BigHeader>
      </View>
    </>
  );
};
export default Notice;
