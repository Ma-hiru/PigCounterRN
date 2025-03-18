import { FC, useEffect, useMemo, useState } from "react";
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
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { useAppDispatch, useAppSelector, useUploadStore } from "@/stores";
import { AreaItem } from "@/types/task";
import { cloneDeep } from "lodash";


interface props {
  id?: number;
}

const UploadFiles: FC<props> = () => {
  /** 预览图 */
  const [previewImg, setPreviewImg] = useState<ImagePickerAsset>();
  const [scale, setScale] = useState(1);
  /** store */
  const { TasksList } = useAppSelector((root) => root.uploadStore);
  const dispatch= useAppDispatch();
  /** 更新标题 */
  const { title, taskIndex } = useLocalSearchParams();
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({ title });
  }, [navigation, title]);
  const Index = (taskIndex as string).split(",");
  /** 获取缓存 */
  const TaskIndex = Number(Index[0]);
  const ItemIndex = Number(Index[1]);
  const ChildIndex = Number(Index[2]);
  const cacheImg = useMemo(() => {
    return (TasksList[TaskIndex].area[ItemIndex] as AreaItem).children[ChildIndex].path;
  }, [ChildIndex, ItemIndex, TaskIndex, TasksList]);
  /** 处理图片 */
  const updateStore = (newPath?: string, newRes?: number) => {
    const newTaskList = cloneDeep(TasksList);
    newPath && ((newTaskList[TaskIndex].area[ItemIndex] as AreaItem).children[ChildIndex].path = newPath);
    newRes && ((newTaskList[TaskIndex].area[ItemIndex] as AreaItem).children[ChildIndex].res = newRes);
    dispatch(useUploadStore.actions.setTasksList(newTaskList));
  };
  const saveImageToStore = async (tempUri: string) => {
    const fileName = `${Date.now()}.jpg`;
    const cachePath = `${FileSystem.cacheDirectory}${fileName}`;
    try {
      await FileSystem.copyAsync({
        from: tempUri,
        to: cachePath
      });
      updateStore(cachePath);
    } catch (err) {
      console.log(err);
      Alert.alert("资源存储失败", "请检查权限！");
    }
  };
  const takePhoto = async () => {
    const { status } = await requestCameraPermissionsAsync();
    if (status !== "granted")
      return Alert.alert("权限被拒绝", "需要相机权限才能拍照");
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
      await saveImageToStore(imgInfo.uri);
    }
  };
  const clearImg = async () => {
    setPreviewImg(undefined);
    updateStore("", -1);
  };
  return (
    <>
      <View className="pl-4 pr-4 mt-4" key={(taskIndex as string[]).toString()}>
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
