import { FC } from "react";
import { Text } from "react-native";
import { GlobalStyles } from "@/settings";
import BigHeader from "@/components/BigHeader";

type props = {
  isUpload: boolean;
  peopleCacheCount: number;
  isOnceUpload: boolean;
  routeTitle: string;
};

const UploadFilesHeader: FC<props> = ({ peopleCacheCount, isOnceUpload, routeTitle, isUpload }) => {
  return (
    <>
      <BigHeader
        title={(defaultStyle) => {
          return (
            <>
              <Text className="text-left" style={defaultStyle}>计数</Text>
              <Text className="text-right"
                    style={{
                      ...defaultStyle as object,
                      color: GlobalStyles.PositiveColor,
                      fontFamily: ""
                    }}>
                {isUpload && peopleCacheCount}
              </Text>
            </>
          );
        }
        }
        titleContainerStyle={{
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center"
        }}
        info={
          <BigHeader.InfoText
            content={isOnceUpload ? `{${routeTitle}}` : `对应区域：{${routeTitle}}`}
            emphasizeColor="#409eff"
            normalColor="#333"
          />
        } containerStyle={{ backgroundColor: "none" }} />
    </>
  );
};
export default UploadFilesHeader;
