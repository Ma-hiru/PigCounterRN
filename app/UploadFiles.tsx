import { FC, useEffect, useState } from "react";
import { View, Alert } from "react-native";
import { Card } from "@/components/ui/card";
import {
  ImagePickerAsset,
  launchCameraAsync,
  requestCameraPermissionsAsync
} from "expo-image-picker";
import { Image } from "expo-image";
import { setImageScale } from "@/utils/setImageScale";
import { ButtonText, Button } from "@/components/ui/button";
import * as FileSystem from "expo-file-system";
import localStore from "@/utils/localStore";
import { useLocalSearchParams, useNavigation } from "expo-router";


interface props {
  id?: number;
}

const saveImageToCache = async (tempUri: string) => {
  try {
    const fileName = `${Date.now()}.jpg`;
    const cachePath = `${FileSystem.cacheDirectory}${fileName}`;
    await FileSystem.copyAsync({
      from: tempUri,
      to: cachePath
    });
    await localStore.setItem("cachedPhotoPath", cachePath);
    return cachePath;
  } catch (error) {
    console.error("保存失败:", error);
    return null;
  }
};
export const UploadFiles: FC<props> = () => {
  const [previewImg, setPreviewImg] = useState<ImagePickerAsset>();
  const [scale, setScale] = useState(1);
  const [cacheImg, setCacheImg] = useState("");
  useEffect(() => {
    if (cacheImg === "") {
      localStore.getItem("cachedPhotoPath").then((path) => {
        if (path) {
          setCacheImg(path);
        }
      });
    }
  }, [cacheImg]);
  const takePhoto = async () => {
    const { status } = await requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("权限被拒绝", "需要相机权限才能拍照");
      return;
    }
    const result = await launchCameraAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: false,
      quality: 0.8,
      base64: false,
      selectionLimit: 1
    });
    if (!result.canceled) {
      const imgInfo = result.assets[0];
      setPreviewImg(imgInfo);
      setCacheImg(imgInfo.uri);
      await saveImageToCache(imgInfo.uri);
    }
  };
  const clearImg = async () => {
    setPreviewImg(undefined);
    setCacheImg("");
    await localStore.setItem("cachedPhotoPath", "");
  };
  /* 更新标题 */
  const { title } = useLocalSearchParams();
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({ title });
  }, [navigation, title]);
  return (
    <>
      <View className="pl-4 pr-4 mt-4">
        <Card>
          {
            (previewImg || cacheImg) &&
            <Image source={previewImg || cacheImg}
                   style={{ width: "100%", aspectRatio: scale }}
                   onLoad={setImageScale(scale, setScale)}
            />
          }
          {
            (previewImg || cacheImg) ?
              (
                <>
                  <Button onPress={clearImg} className="mt-4">
                    <ButtonText>取消</ButtonText>
                  </Button>
                  <Button style={{ marginTop: 10 }}>
                    <ButtonText>上传</ButtonText>
                  </Button>
                </>
              ) :
              (
                <Button onPress={takePhoto} className="mt-4">
                  <ButtonText>拍照</ButtonText>
                </Button>
              )
          }
        </Card>
      </View>
    </>
  );
};
export default UploadFiles;
