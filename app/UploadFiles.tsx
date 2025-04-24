import {
  DEFAULT_UPLOAD_PATH,
  DEFAULT_UPLOAD_RES,
  DEFAULT_UPLOAD_TYPE,
  UPLOAD_QUALITY
} from "@/settings";
import { AssetsToRNFile, UriToRNFile } from "@/utils/convertToRNFile";
import { useFetchData } from "@/utils/fetchData";
import { removeFile, saveFile } from "@/utils/saveFile";
import { TaskIndexTuple, updateTaskList } from "@/utils/updateTaskStore";
import { FC, useCallback, useMemo, useRef, useState } from "react";
import { ScrollView, StatusBar, View } from "react-native";
import { ImagePickerResult } from "expo-image-picker";
import {
  uploadSelector,
  useAppSelector
} from "@/stores";
import { useToast } from "@/components/ui/toast";
import ImagePreview from "@/components/upload/ImagePreview";
import UploadPagesPreviewCard from "@/components/upload/UploadPagesPreviewCard";
import UploadPagesOptionsCard from "@/components/upload/UploadPagesOptionsCard";
import { useGetRouteParam } from "@/hooks/useGetRouteParam";
import background from "@/assets/images/bg_1.jpg";
import { Image } from "expo-image";
import { Log } from "@/utils/logger";
import { handleUploadURL } from "@/utils/handleServerURL";
import MyPortal from "@/components/MyPortal";
import { useMyState } from "@/hooks/useMyState";
import { fileSystem } from "@/utils/fileSystem";
import UploadFilesHeader from "@/components/upload/UploadFilesHeader";

const _ = undefined;

const UploadFiles: FC = () => {
  /** 预览 */
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImg, setPreviewImg] = useState<RNFile>();
  const [previewVideo, setPreviewVideo] = useState<RNFile>();
  const [scale, setScale] = useState(1);
  /** 获取路由参数 */
  const toast = useToast();
  const routeTitle = useRef("");
  const isOnceUpload = useRef(false);
  const [TaskIndex, BuildingIndex, PenIndex, PenId] = useGetRouteParam<Record<keyof UploadFilesRouteParams, string>, number[]>((params) => {
    routeTitle.current = params.title;
    isOnceUpload.current = params.once === "true";
    const data = params.taskIndex.split(",");
    data.push(params.penId);
    return data.map(Number);
  });
  const TaskIndexTuple: TaskIndexTuple = useMemo(() => ({
    TaskIndex,
    BuildingIndex,
    PenIndex
  } satisfies  TaskIndexTuple), [BuildingIndex, PenIndex, TaskIndex]);
  /** store */
  let { TasksList, OnceTask } = useAppSelector(uploadSelector);
  Log.Console("isOnceUpload.current", isOnceUpload.current);
  if (isOnceUpload.current) TasksList = OnceTask;
  /** 获取缓存 */
  const cachePath = useMemo(() => {
    const pen = TasksList[TaskIndex].buildings[BuildingIndex].pens[PenIndex];
    return { path: pen.picturePath ?? "", type: pen.type ?? "" };
  }, [BuildingIndex, PenIndex, TaskIndex, TasksList]);
  const [cacheCount, peopleCacheCount] = useMemo(() => {
    const pen = TasksList[TaskIndex].buildings[BuildingIndex].pens[PenIndex];
    return [pen.penNum, pen?.peopleNum ?? -1];
  }, [BuildingIndex, PenIndex, TaskIndex, TasksList]);

  /** 选择、缓存图片 */
  const resolveTemp = useCallback(async (tempUri: string, mode: "save" | "delete", type?: "images" | "videos" | "") => {
    switch (mode) {
      case "save":
        await saveFile(
          tempUri,
          `${Date.now()}.${type === "images" ? "jpeg" : "mp4"}`,
          (file) => {
            updateTaskList(TaskIndexTuple, file.uri, type, _, _, isOnceUpload.current);
          });
        break;
      case "delete":
        await removeFile(tempUri, (_) => {
          updateTaskList(TaskIndexTuple, DEFAULT_UPLOAD_PATH, DEFAULT_UPLOAD_TYPE, DEFAULT_UPLOAD_RES, DEFAULT_UPLOAD_RES, isOnceUpload.current);
        });
    }
  }, [TaskIndexTuple]);
  const takeAssets = useCallback((mode: "images" | "videos", method: "take" | "pick") => async () => {
    let result: ImagePickerResult;
    if (method === "take") {
      const res = await fileSystem.TakeAssets({
        mediaTypes: mode,
        allowsEditing: false,
        quality: UPLOAD_QUALITY,
        base64: false,
        selectionLimit: 1
      }, toast);
      if (res === null) return;
      result = res;
    } else {
      const res = await fileSystem.PickAssets({
        mediaTypes: mode,
        allowsEditing: false,
        quality: UPLOAD_QUALITY,
        base64: false,
        selectionLimit: 1
      }, toast);
      if (res === null) return;
      result = res;
    }
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
  }, [resolveTemp, toast]);

  /** 清理缓存 */
  const clearImg = useCallback(async () => {
    setPreviewImg(undefined);
    setPreviewVideo(undefined);
    await resolveTemp(previewImg?.uri || cachePath.path, "delete");
  }, [cachePath.path, previewImg?.uri, resolveTemp]);
  const clearUpload = useCallback(async () => {
    await clearImg();
    setIsUpload(false);
  }, [clearImg]);

  /** 上传预览 */
  const [isUpload, setIsUpload] = useState(cacheCount !== DEFAULT_UPLOAD_RES);

  /** 提交 */
  const { fetchData, API } = useFetchData();
  const loading = useMyState(false);
  const submitFile = useCallback(async () => {
    const file = await UriToRNFile(cachePath.path);
    if (file.uri === "") return;
    loading.set(true);
    try {
      await fetchData(
        API.reqUpload,
        [{
          taskId: TaskIndex,
          penId: PenId,
          files: [file]
        }],
        async (res) => {
          Log.Console("uploadResponse", res);
          const resURL = handleUploadURL(res.data.outputPicturePath[0]);
          Log.Echo({ resURL });
          const file = await fileSystem.DownloadFile(resURL);
          if (!file) {
            Log.Console("DownloadFile", "结果图片下载失败");
            Log.Message(toast, "处理出错！", "结果图片下载失败");
            //TODO 加载失败使用默认图片
            return;
          }
          switch (cachePath.type) {
            case "images":
              setPreviewImg(file);
              break;
            case "videos":
              setPreviewVideo(file);
          }
          updateTaskList(TaskIndexTuple, file.uri, cachePath.type, res.data.count[0], res.data.count[0], isOnceUpload.current);
          setIsUpload(true);
        },
        (res, createToast) => {
          createToast("处理出错！", res?.message);
        }
      );
    } finally {
      loading.set(false);
    }
  }, [API.reqUpload, PenId, TaskIndex, TaskIndexTuple, cachePath.path, cachePath.type, fetchData, loading, toast]);
  const confirmData = useCallback(() => {
    //TODO 确认数据
  }, []);
  const addArtifact = useCallback((res: number) => {
    updateTaskList(TaskIndexTuple, _, _, _, res, isOnceUpload.current);
  }, [TaskIndexTuple]);
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
      <View className="flex-1 relative">
        <Image source={background} style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          inset: 0
        }} contentFit={"cover"}
        />
        <UploadFilesHeader
          isUpload={isUpload}
          peopleCacheCount={peopleCacheCount}
          isOnceUpload={isOnceUpload.current} routeTitle={routeTitle.current}
        />
        <ScrollView className="pl-8 pr-8 flex-1 "
                    key={TaskIndex << 20 + BuildingIndex << 10 + PenIndex}
                    style={{ marginTop: 30 }}
        >
          <View className="flex-1">
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
              count={cacheCount}
            />
            <MyPortal visible={loading.get()} text="分析中" />
          </View>
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
