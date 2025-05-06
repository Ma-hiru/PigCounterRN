import { FC, ReactNode } from "react";
import { StyleProp, Text, TextStyle } from "react-native";
import { GlobalStyles } from "@/settings";

type props = {
  content?: string;
  emphasizeColor?: string;
  normalColor?: string;
  children?: ReactNode;
  textStyle?: StyleProp<TextStyle>;
}

const BigHeaderInfoText: FC<props> = (
  {
    content,
    emphasizeColor = GlobalStyles.ThemeColor1,
    normalColor = "#444",
    children,
    textStyle
  }) => {

  return (
    <>
      {
        content?.split(/({.*?})/g)?.map((part, index) => {
          if (part.startsWith("{") && part.endsWith("}")) {
            return (
              <Text className="text-left" style={{
                color: emphasizeColor,
                fontFamily: "baigetianxingtiRegular" as Fonts, ...textStyle as object
              }}
                    key={index}>
                {part.slice(1, -1)}
              </Text>
            );
          } else {
            return (
              <Text className="text-left" style={{ fontFamily: "FlyFlowerSongRegular" as Fonts,color: normalColor, ...textStyle as object }}
                    key={index}>
                {part}
              </Text>
            );
          }
        })
      }
      {children}
    </>
  );
};
export default BigHeaderInfoText;
