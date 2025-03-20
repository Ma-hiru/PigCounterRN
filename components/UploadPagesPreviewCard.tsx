import { FC } from "react";
import { Pressable, StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { Image, ImageStyle } from "expo-image";
import { setImageScale } from "@/utils/setImageScale";
import NoData from "@/assets/images/upload/logout.svg";
import { Text as TextInline } from "@/components/ui/text";
import { Card } from "@/components/ui/card";
import { ImagePickerAsset } from "expo-image-picker";

interface props {
  previewImg?: ImagePickerAsset;
  previewVideo?: unknown;
  cachePath: { path: string; type: string };
  setPreviewVisible: (previewVisible: boolean) => any;
  scale: number;
  setScale: (scale: number) => any;
}

export const UploadPagesPreviewCard: FC<props> = (
  {
    previewImg,
    cachePath,
    setPreviewVisible,
    scale,
    setScale,
  }) => {
  return (
    <>
      <Card className="mb-4">
        {
          (previewImg || cachePath.path)
            ?
            <Pressable onPress={() => setPreviewVisible(true)}>
              {
                cachePath.type === "image" ?
                  <Image source={previewImg || cachePath.path}
                         style={{ width: "100%", aspectRatio: scale }}
                         onLoad={setImageScale(scale, setScale)}
                  /> :
                  ""
              }
            </Pressable>
            :
            <View className="flex flex-row justify-center items-center"
                  style={styles.previewCard}>
              <Image source={NoData} style={styles.icon} />
              <TextInline>暂无预览</TextInline>
            </View>
        }
      </Card>
    </>
  );
};
export default UploadPagesPreviewCard;
const styles = StyleSheet.create({
  previewCard: {
    height: 180,
    backgroundColor: "rgba(0,0,0,0.1)"
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 5
  }
});
