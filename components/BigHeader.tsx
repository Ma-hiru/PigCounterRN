import { useSafeArea } from "@/hooks/useSafeArea";
import { FC, ReactNode } from "react";
import { StyleProp, Text, View, ViewStyle } from "react-native";

interface props {
  children?: ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  title: string;
  info: ReactNode;
}

const BigHeader: FC<props> = ({ children, containerStyle, title, info }) => {
  const { topInset } = useSafeArea();
  return (
    <>
      <View className="flex justify-start items-center w-screen bg-white"
            style={containerStyle}>
        <View className="flex justify-center items-center w-[80%]"
              style={{ paddingTop: topInset + 40 }}>
          <View
            className="w-full justify-start items-center flex-row select-none font-bold"
          >
            <Text style={{ fontSize: 45, fontWeight: "bold" }}>
              {title}
            </Text>
          </View>
          <View className="flex-row justify-start items-center w-full">
            {info}
          </View>
          {children}
        </View>
      </View>
    </>
  );
};
export default BigHeader;
