import BigHeader from "@/components/BigHeader";
import { FC } from "react";
import { StatusBar, Text, View } from "react-native";
import { APP_NAME, GlobalStyles } from "@/settings";

type props = object

export const Settings: FC<props> = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
      <View className="flex-1 bg-white">
        <BigHeader title="设置" info={
          <>
            <Text className="text-left text-[#999999]">配置</Text>
            <Text className="text-left"
                  style={{ color: GlobalStyles.ThemeColor1 }}>
              {APP_NAME}
            </Text>
            <Text className="text-left text-[#999999]">系统</Text>
          </>
        } />
      </View>
    </>
  );
};
// noinspection JSUnusedGlobalSymbols
export default Settings;
