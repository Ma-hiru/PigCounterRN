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
import BigHeaderInfoText from "@/components/BigHeaderInfoText";

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
  title: ((defaultStyle: StyleProp<TextStyle>) => ReactNode) | ReactNode;
  info: ReactNode;
}

const BigHeader: FC<props> & { InfoText: typeof BigHeaderInfoText } = (
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
    font = "FlyFlowerSongRegular"
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
            <Pressable className="w-full justify-center items-start" onPress={back}
                       style={backContainerStyle}>
              <Image source={backIcon}
                     style={{ height: 30, width: 30, ...backIconStyle as object }} />
            </Pressable>
          }
          <View
            className="w-full justify-start items-center flex-row select-none font-bold"
            style={titleContainerStyle}
          >
            {
              typeof title === "string" ? (
                <Text style={{
                  fontSize: 45,
                  fontWeight: "normal",
                  fontFamily: font, ...titleStyle as object
                }}>
                  {title}
                </Text>
              ) : typeof title === "function" ?
                <>
                  {title({
                    fontSize: 45,
                    fontWeight: "normal",
                    fontFamily: font, ...titleStyle as object
                  })}
                </> :
                <>{title}</>
            }
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
BigHeader.InfoText = BigHeaderInfoText;
export default BigHeader;
