import { reqUpload } from "@/api/moudule/uploadAPI";
import BigHeader from "@/components/BigHeader";
import { baseUrl } from "@/settings";
import { AssetsToRNFile, UriToRNFile } from "@/utils/convertToRNFile";
import { DownloadFile } from "@/utils/downloadFile";
import { fetchData } from "@/utils/fetchData";
import { FC, useCallback, useMemo, useRef, useState } from "react";
import { Alert, ScrollView, StatusBar, Text, View } from "react-native";
import {
  ImagePickerResult, launchCameraAsync,
  launchImageLibraryAsync, requestCameraPermissionsAsync,
  requestMediaLibraryPermissionsAsync
} from "expo-image-picker";
import { copyAsync, cacheDirectory, getInfoAsync, deleteAsync } from "expo-file-system";
import { uploadActions, uploadSelector, useAppDispatch, useAppSelector } from "@/stores";
import { cloneDeep } from "lodash-es";
import { showNewToast } from "@/utils/toast";
import { useToast } from "@/components/ui/toast";
import ImagePreview from "@/components/upload/ImagePreview";
import UploadPagesPreviewCard from "@/components/upload/UploadPagesPreviewCard";
import UploadPagesOptionsCard from "@/components/upload/UploadPagesOptionsCard";
import Logger from "@/utils/logger";
import { useGetRouteParam } from "@/hooks/useGetRouteParam";
import { useImmer } from "use-immer";

const { setTasksList } = uploadActions;
const _ = undefined;
type RouteParams = {
  title: string;
  taskIndex: string;
  penId: string;
}
const UploadFiles: FC = () => {
  /** 预览 */
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImg, setPreviewImg] = useState<RNFile>();
  const [previewVideo, setPreviewVideo] = useState<RNFile>();
  const [scale, setScale] = useState(1);
  /** store */
  const {
    TasksList,
    DEFAULT_UPLOAD_PATH,
    DEFAULT_UPLOAD_RES,
    DEFAULT_UPLOAD_TYPE
  } = useAppSelector(uploadSelector);
  const dispatch = useAppDispatch();
  /** 获取路由参数 */
  const toast = useToast();
  const routeTitle = useRef("");
  const [TaskIndex, BuildingIndex, PenIndex, PenId] = useGetRouteParam<RouteParams, number[]>((params) => {
    routeTitle.current = params.title;
    const data = params.taskIndex.split(",");
    data.push(params.penId);
    return data.map(Number);
  });
  /** 获取缓存 */
  const cachePath = useMemo(() => {
    const pen = TasksList[TaskIndex].buildings[BuildingIndex].pens[PenIndex];
    return { path: pen.picturePath ?? "", type: pen.type ?? "" };
  }, [BuildingIndex, PenIndex, TaskIndex, TasksList]);
  const cacheCount = useMemo(() => {
    const pen = TasksList[TaskIndex].buildings[BuildingIndex].pens[PenIndex];
    return pen.penNum;
  }, [BuildingIndex, PenIndex, TaskIndex, TasksList]);
  /** 选择、缓存图片 */
  const updateStore = useCallback((newPath?: string, newType?: "videos" | "images" | typeof DEFAULT_UPLOAD_TYPE, newRes?: number) => {
    const newTaskList = cloneDeep(TasksList);
    const pen = newTaskList[TaskIndex].buildings[BuildingIndex].pens[PenIndex];
    newPath !== undefined && (pen.picturePath = newPath);
    newRes && (pen.penNum = newRes);
    newType !== undefined && (pen.type = newType);
    // newTaskList[TaskIndex].buildings[BuildingIndex].pens[PenIndex] = pen;
    dispatch(setTasksList(newTaskList));
  }, [BuildingIndex, PenIndex, TaskIndex, TasksList, dispatch]);
  const resolveTemp = useCallback(async (tempUri: string, mode: "save" | "delete", type?: "images" | "videos" | "") => {
    switch (mode) {
      case "save":
        const fileName = `${Date.now()}.${type === "images" ? "jpeg" : "mp4"}`;
        const cachePath = `${cacheDirectory}${fileName}`;
        try {
          await copyAsync({
            from: tempUri,
            to: cachePath
          });
          updateStore(cachePath, type);
        } catch (err) {
          Logger("console", err);
          Alert.alert("资源存储失败", "请检查权限！");
        }
        break;
      case "delete":
        try {
          const { exists } = await getInfoAsync(tempUri);
          exists && await deleteAsync(tempUri, { idempotent: true });
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
        selectionLimit: 1
      });
    } else {
      const { status } = await requestMediaLibraryPermissionsAsync();
      if (status !== "granted") return Alert.alert("权限被拒绝", `需要文件访问权限才能选择文件`);
      result = await launchImageLibraryAsync({
        mediaTypes: mode,
        allowsEditing: false,
        quality: 0.8,
        base64: false,
        selectionLimit: 1
      });
    }
    if (!result.canceled) {
      const file = result.assets[0];
      const fileInfo = AssetsToRNFile(file);
      switch (mode) {
        case "images":
          setPreviewImg(fileInfo);
          setScale(file.width / file.height);
          break;
        case "videos":
          setPreviewVideo(fileInfo);
      }
      return await resolveTemp(fileInfo.uri, "save", mode);
    }
  }, [resolveTemp]);
  /** 清理缓存 */
  const clearImg = useCallback(async () => {
    setPreviewImg(undefined);
    setPreviewVideo(undefined);
    await resolveTemp(previewImg?.uri || cachePath.path, "delete");
  }, [cachePath.path, previewImg?.uri, resolveTemp]);
  const clearUpload = useCallback(async () => {
    // TODO fetchData();
    await clearImg();
    setIsUpload(false);
  }, [clearImg]);
  /** 上传预览 */
  const [isUpload, setIsUpload] = useState(cacheCount !== DEFAULT_UPLOAD_RES);
  /** 提交 */
  const [count, setCount] = useImmer({
    //TODO 修改字段
    aiCount: DEFAULT_UPLOAD_RES as number,
    peopleCount: DEFAULT_UPLOAD_RES as number
  });
  const submitFile = useCallback(async () => {
    const file = await UriToRNFile(cachePath.path);
    // TODO check const file2 = await UriToBlob(cachePath.path);
    setIsUpload(true);
    setCount((draft) => {
      draft.aiCount = draft.peopleCount = 20;
    });
    if (file.uri === "") return;
    const res = await fetchData(
      reqUpload,
      {
        penId: PenId,
        files: [file]
      },
      async (res) => {
        const file = await DownloadFile(baseUrl + res.data.outputPicturePath[0]);
        switch (cachePath.type) {
          case "images":
            setPreviewImg(file);
            break;
          case "videos":
            setPreviewVideo(file);
        }
        updateStore(_, _, res.data.count[0]);
        await resolveTemp(file.uri, "save", cachePath.type);
        setIsUpload(true);
        setCount((draft) => {
          draft.aiCount = draft.peopleCount = res.data.count[0];
        });
      },
      (res, createToast) => {
        createToast("处理出错！", res?.message);
      },
      toast
    );
  }, [cachePath.path, cachePath.type, PenId, toast, updateStore, resolveTemp, setCount]);
  const confirmData = useCallback(() => {
  }, []);
  const addArtifact = useCallback(() => {
  }, []);
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
      <View className="flex-1 bg-white">
        <BigHeader title="上传" info={
          <>
            <Text className="text-left">对应区域：</Text>
            <Text className="text-left color-[#409eff]">{routeTitle.current}</Text>
          </>
        } />
        <ScrollView className="pl-8 pr-8 mt-4 flex-1"
                    key={TaskIndex << 23 + BuildingIndex << 16 + PenIndex}
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
            previewVideo={previewVideo}
            cachePath={cachePath}
            clearImg={clearImg}
            takeAssets={takeAssets}
            submitFile={submitFile}
            clearUpload={clearUpload}
            isUpload={isUpload}
            confirmData={confirmData}
            addArtifact={addArtifact}
            useCount={[count, setCount]}
          />
        </ScrollView>
        <ImagePreview
          isPreviewVisible={previewVisible}
          setPreviewVisible={setPreviewVisible}
          source={{ uri: previewImg?.uri || cachePath.path }}
        />
      </View>
    </>
  );
};
// noinspection JSUnusedGlobalSymbols
export default UploadFiles;
