import { FC, useEffect, useMemo, useState } from "react";
import { View, Alert } from "react-native";
import {
  ImagePickerAsset,
  launchCameraAsync,
  requestCameraPermissionsAsync
} from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { uploadActions, uploadSelector, useAppDispatch, useAppSelector} from "@/stores";
import { AreaItem } from "@/types/task";
import { cloneDeep } from "lodash";
import { showNewToast } from "@/utils/toast";
import { useToast } from "@/components/ui/toast";
import ImagePreview from "@/components/ImagePreview";
import UploadPagesPreviewCard from "@/components/UploadPagesPreviewCard";
import UploadPagesOptionsCard from "@/components/UploadPagesOptionsCard";
import Logger from "@/utils/logger";

interface props {
  /* empty */
}

const { setTasksList } = uploadActions;
const UploadFiles: FC<props> = () => {
  /** 预览图 */
  const [previewImg, setPreviewImg] = useState<ImagePickerAsset>();
  const [previewVideo, setPreviewVideo] = useState<any>();
  const [scale, setScale] = useState(1);
  /** store */
  const {
    TasksList,
    DEFAULT_UPLOAD_PATH,
    DEFAULT_UPLOAD_RES
  } = useAppSelector(uploadSelector);
  const dispatch = useAppDispatch();
  /** 更新标题 */
  const { title, taskIndex }: Record<string, string> = useLocalSearchParams();
  const navigation = useNavigation();
  const toast = useToast();
  useEffect(() => {
    navigation.setOptions({ title });
  }, [navigation, title]);
  /** 获取缓存 */
  const [TaskIndex, ItemIndex, ChildIndex] = taskIndex.split(",").map(Number);
  const cachePath = useMemo(() => {
    const path = (TasksList[TaskIndex].area[ItemIndex] as AreaItem).children[ChildIndex].path;
    const type = path.includes("video") ? "video" : "image";
    return {
      path,
      type
    };
  }, [ChildIndex, ItemIndex, TaskIndex, TasksList]);
  /** 选择、缓存图片 */
  const updateStore = (newPath?: string, newRes?: number) => {
    const newTaskList = cloneDeep(TasksList);
    newPath !== undefined && ((newTaskList[TaskIndex].area[ItemIndex] as AreaItem).children[ChildIndex].path = newPath);
    newRes && ((newTaskList[TaskIndex].area[ItemIndex] as AreaItem).children[ChildIndex].res = newRes);
    dispatch(setTasksList(newTaskList));
  };
  const resolveTemp = async (tempUri: string, mode: "save" | "delete") => {
    switch (mode) {
      case "save":
        const fileName = `${Date.now()}.jpg`;
        const cachePath = `${FileSystem.cacheDirectory}${fileName}`;
        try {
          await FileSystem.copyAsync({
            from: tempUri,
            to: cachePath
          });
          updateStore(cachePath);
        } catch (err) {
          Logger("console", err);
          Alert.alert("资源存储失败", "请检查权限！");
        }
        break;
      case "delete":
        try {
          const { exists } = await FileSystem.getInfoAsync(tempUri);
          exists && await FileSystem.deleteAsync(tempUri, { idempotent: true });
        } catch (err) {
          Logger("console", err);
          showNewToast(toast, "缓存清除失败", "可能缓存已被删除。");
        }
    }
  };
  const takeCamera = (mode: "image" | "video") => async () => {
    const { status } = await requestCameraPermissionsAsync();
    if (status !== "granted")
      return Alert.alert("权限被拒绝", `需要相机权限才能${mode === "image" ? "拍照" : "录像"}`);
    const result = await launchCameraAsync({
      mediaTypes: mode === "image" ? ["images"] : ["videos"],
      allowsEditing: false,
      quality: 0.8,
      base64: false,
      selectionLimit: 1
    });
    if (!result.canceled) {
      const fileInfo = result.assets[0];
      switch (mode) {
        case "image":
          setPreviewImg(fileInfo);
          setScale(fileInfo.width / fileInfo.height);
          break;
        case "video":
          setPreviewVideo(fileInfo);
      }
      return await resolveTemp(fileInfo.uri, "save");
    }
  };
  const clearImg = async () => {
    setPreviewImg(undefined);
    updateStore(DEFAULT_UPLOAD_PATH, DEFAULT_UPLOAD_RES);
    await resolveTemp(previewImg?.uri || cachePath.path, "delete");
  };
  /** 预览 */
  const [previewVisible, setPreviewVisible] = useState(false);
  return (
    <>
      <View className="pl-4 pr-4 mt-4 flex-1"
            key={taskIndex}
      >
        <UploadPagesPreviewCard
          setPreviewVisible={setPreviewVisible}
          previewImg={previewImg}
          previewVideo={previewVideo}
          setScale={setScale}
          cachePath={cachePath}
          scale={scale}
        />
        <UploadPagesOptionsCard
          previewImg={previewImg}
          cachePath={cachePath}
          clearImg={clearImg}
          takeCamera={takeCamera}
        />
      </View>
      <ImagePreview
        isPreviewVisible={previewVisible}
        setPreviewVisible={setPreviewVisible}
        source={{ uri: previewImg?.uri || cachePath.path }}
      />
    </>
  );
};
export default UploadFiles;
