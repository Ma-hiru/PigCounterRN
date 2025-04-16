import { FC, ReactNode } from "react";
import { Text } from "react-native";
import { GlobalStyles } from "@/settings";

type props = {
  content?: string;
  emphasizeColor?: string;
  normalColor?: string;
  children?: ReactNode;
}

const BigHeaderInfoText: FC<props> = (
  {
    content,
    emphasizeColor = GlobalStyles.ThemeColor1,
    normalColor = "#999999",
    children
  }) => {

  return (
    <>
      {
        content?.split(/({.*?})/g)?.map((part, index) => {
          if (part.startsWith("{") && part.endsWith("}")) {
            return (
              <Text className="text-left" style={{ color: emphasizeColor }}
                    key={index}>
                {part.slice(1, -1)}
              </Text>
            );
          } else {
            return (
              <Text className="text-left" style={{ color: normalColor }}
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
