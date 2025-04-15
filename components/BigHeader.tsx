import { useSafeArea } from "@/hooks/useSafeArea";
import { FC, ReactNode } from "react";
import {
  Pressable,
  StyleProp,
  Text,
  TextStyle,
  View,
  ViewStyle,
  ImageStyle as RNImageStyle
} from "react-native";
import backIcon from "@/assets/images/back.svg";
import { Image } from "expo-image";
import { useRouter } from "expo-router";

interface props {
  children?: ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  titleContainerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  infoContainerStyle?: StyleProp<ViewStyle>;
  backContainerStyle?: StyleProp<ViewStyle>;
  backIconStyle?: StyleProp<RNImageStyle>;
  hasBackIcon?: boolean;
  font?: Fonts,
  title: string;
  info: ReactNode;
}

const BigHeader: FC<props> = (
  {
    children,
    containerStyle,
    title,
    info,
    titleContainerStyle,
    titleStyle,
    infoContainerStyle,
    backContainerStyle,
    backIconStyle,
    contentStyle,
    hasBackIcon = true,
    font = "HarmonyOS_Sans_Medium"
  }) => {
  const { topInset } = useSafeArea();
  const { back } = useRouter();

  return (
    <>
      <View className="flex justify-start items-center w-screen bg-white" style={containerStyle}>
        <View className="flex justify-center items-center w-[85%]"
              style={{ paddingTop: topInset + 20, ...contentStyle as object }}>
          {
            hasBackIcon &&
            <Pressable className="w-full justify-center items-start mb-4" onPress={back}
                       style={backContainerStyle}>
              <Image source={backIcon}
                     style={{ height: 25, width: 25, ...backIconStyle as object }} />
            </Pressable>
          }
          <View
            className="w-full justify-start items-center flex-row select-none font-bold"
            style={titleContainerStyle}
          >
            <Text style={{
              fontSize: 45,
              fontWeight: "bold",
              fontFamily: font, ...titleStyle as object,
            }}>
              {title}
            </Text>
          </View>
          <View className="flex-row justify-start items-center w-full" style={infoContainerStyle}>
            {info}
          </View>
          {children}
        </View>
      </View>
    </>
  );
};
export default BigHeader;
