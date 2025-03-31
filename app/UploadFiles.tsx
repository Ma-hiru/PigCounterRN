import { VideoSource } from "expo-video";
import { FC, useCallback, useMemo, useState } from "react";
import { Alert, ScrollView } from "react-native";
import {
  ImagePickerAsset, ImagePickerResult, launchCameraAsync,
  launchImageLibraryAsync, requestCameraPermissionsAsync,
  requestMediaLibraryPermissionsAsync,
} from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { uploadActions, uploadSelector, useAppDispatch, useAppSelector } from "@/stores";
import { AreaItem } from "@/types/task";
import { cloneDeep } from "lodash";
import { showNewToast } from "@/utils/toast";
import { useToast } from "@/components/ui/toast";
import ImagePreview from "@/components/upload/ImagePreview";
import UploadPagesPreviewCard from "@/components/upload/UploadPagesPreviewCard";
import UploadPagesOptionsCard from "@/components/upload/UploadPagesOptionsCard";
import Logger from "@/utils/logger";
import { useGetRouteParam } from "@/hooks/useGetRouteParam";

const { setTasksList } = uploadActions;

type RouteParams = {
  title: string;
  taskIndex: string;
}

const UploadFiles: FC = () => {
  /** 预览 */
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImg, setPreviewImg] = useState<ImagePickerAsset>();
  const [previewVideo, setPreviewVideo] = useState<VideoSource>();
  const [scale, setScale] = useState(1);
  /** store */
  const {
    TasksList,
    DEFAULT_UPLOAD_PATH,
    DEFAULT_UPLOAD_RES,
    DEFAULT_UPLOAD_TYPE,
  } = useAppSelector(uploadSelector);
  const dispatch = useAppDispatch();
  /** 获取路由参数 */
  const toast = useToast();
  const [TaskIndex, ItemIndex, ChildIndex] = useGetRouteParam<RouteParams, number[]>((params) => params.taskIndex.split(",").map(Number));
  /** 获取缓存 */
  const cachePath = useMemo(() => {
    const item = (TasksList[TaskIndex].area[ItemIndex] as AreaItem).children[ChildIndex];
    const path = item.path ?? "";
    const type = item.type ?? "";
    return {
      path,
      type,
    };
  }, [ChildIndex, ItemIndex, TaskIndex, TasksList]);
  /** 选择、缓存图片 */
  const updateStore = useCallback((newPath?: string, newType?: "videos" | "images" | typeof DEFAULT_UPLOAD_TYPE, newRes?: number) => {
    const newTaskList = cloneDeep(TasksList);
    const item = (newTaskList[TaskIndex].area[ItemIndex] as AreaItem).children[ChildIndex];
    newPath !== undefined && (item.path = newPath);
    newRes && (item.res = newRes);
    newType !== undefined && (item.type = newType);
    (newTaskList[TaskIndex].area[ItemIndex] as AreaItem).children[ChildIndex] = item;
    dispatch(setTasksList(newTaskList));
  }, [ChildIndex, ItemIndex, TaskIndex, TasksList, dispatch]);
  const resolveTemp = useCallback(async (tempUri: string, mode: "save" | "delete", type?: "images" | "videos") => {
    switch (mode) {
      case "save":
        const fileName = `${Date.now()}.${type === "images" ? "jpeg" : "mp4"}`;
        const cachePath = `${FileSystem.cacheDirectory}${fileName}`;
        try {
          await FileSystem.copyAsync({
            from: tempUri,
            to: cachePath,
          });
          updateStore(cachePath, type);
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
        } finally {
          updateStore(DEFAULT_UPLOAD_PATH, DEFAULT_UPLOAD_TYPE, DEFAULT_UPLOAD_RES);
        }
    }
  }, [DEFAULT_UPLOAD_PATH, DEFAULT_UPLOAD_RES, DEFAULT_UPLOAD_TYPE, toast, updateStore]);
  const takeAssets = useCallback((mode: "images" | "videos", method: "take" | "pick") => async () => {
    let result: ImagePickerResult;
    if (method === "take") {
      const { status } = await requestCameraPermissionsAsync();
      if (status !== "granted") return Alert.alert("权限被拒绝", `需要相机权限才能${mode === "images" ? "拍照" : "录像"}`);
      result = await launchCameraAsync({
        mediaTypes: mode,
        allowsEditing: false,
        quality: 0.8,
        base64: false,
        selectionLimit: 1,
      });
    } else {
      const { status } = await requestMediaLibraryPermissionsAsync();
      if (status !== "granted") return Alert.alert("权限被拒绝", `需要文件访问权限才能选择文件`);
      result = await launchImageLibraryAsync({
        mediaTypes: mode,
        allowsEditing: false,
        quality: 0.8,
        base64: false,
        selectionLimit: 1,
      });
    }
    if (!result.canceled) {
      const fileInfo = result.assets[0];
      switch (mode) {
        case "images":
          setPreviewImg(fileInfo);
          setScale(fileInfo.width / fileInfo.height);
          break;
        case "videos":
          setPreviewVideo(fileInfo as VideoSource);
      }
      return await resolveTemp(fileInfo.uri, "save", mode);
    }
  }, [resolveTemp]);
  const clearImg = useCallback(async () => {
    setPreviewImg(undefined);
    setPreviewVideo(undefined);
    await resolveTemp(previewImg?.uri || cachePath.path, "delete");
  }, [cachePath.path, previewImg?.uri, resolveTemp]);
  return (
    <>
      <ScrollView className="pl-4 pr-4 mt-4 flex-1"
                  key={TaskIndex << 23 + ItemIndex << 16 + ChildIndex}
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
          takeAssets={takeAssets}
        />
      </ScrollView>
      <ImagePreview
        isPreviewVisible={previewVisible}
        setPreviewVisible={setPreviewVisible}
        source={{ uri: previewImg?.uri || cachePath.path }}
      />
    </>
  );
};
// noinspection JSUnusedGlobalSymbols
export default UploadFiles;
