import { reqUpload } from "@/api/moudule/uploadAPI";
import BigHeader from "@/components/BigHeader";
import { GlobalStyles, UPLOAD_QUALITY } from "@/settings";
import { AssetsToRNFile, UriToRNFile } from "@/utils/convertToRNFile";
import { DownloadFile } from "@/utils/downloadFile";
import { fetchData } from "@/utils/fetchData";
import { removeFile, saveFile } from "@/utils/saveFile";
import { TaskIndexTuple, updateTaskList } from "@/utils/updateTaskStore";
import { FC, useCallback, useMemo, useRef, useState } from "react";
import { Alert, ScrollView, StatusBar, Text, View } from "react-native";
import {
  ImagePickerResult, launchCameraAsync,
  launchImageLibraryAsync, requestCameraPermissionsAsync,
  requestMediaLibraryPermissionsAsync
} from "expo-image-picker";
import {
  OnceTaskTemp,
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
import logger from "@/utils/logger";
import { handleUploadURL } from "@/utils/handleServerURL";
import MyPortal from "@/components/MyPortal";
import { useMyState } from "@/hooks/useMyState";
import { UploadFilesRouteParams } from "@/types/route";

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
  const {
    DEFAULT_UPLOAD_PATH,
    DEFAULT_UPLOAD_RES,
    DEFAULT_UPLOAD_TYPE
  } = useAppSelector(uploadSelector);
  let {
    TasksList
  } = useAppSelector(uploadSelector);
  if (isOnceUpload.current) {
    TasksList = OnceTaskTemp;
  }
  logger("console", "TasksList", TasksList, "Index", TaskIndexTuple);
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
            updateTaskList(TaskIndexTuple, file.uri, type);
          });
        break;
      case "delete":
        await removeFile(tempUri, (_) => {
          updateTaskList(TaskIndexTuple, DEFAULT_UPLOAD_PATH, DEFAULT_UPLOAD_TYPE, DEFAULT_UPLOAD_RES);
        });
    }
  }, [DEFAULT_UPLOAD_PATH, DEFAULT_UPLOAD_RES, DEFAULT_UPLOAD_TYPE, TaskIndexTuple]);
  const takeAssets = useCallback((mode: "images" | "videos", method: "take" | "pick") => async () => {
    let result: ImagePickerResult;
    if (method === "take") {
      const { status } = await requestCameraPermissionsAsync();
      if (status !== "granted") return Alert.alert("权限被拒绝", `需要相机权限才能${mode === "images" ? "拍照" : "录像"}`);
      result = await launchCameraAsync({
        mediaTypes: mode,
        allowsEditing: false,
        quality: UPLOAD_QUALITY,
        base64: false,
        selectionLimit: 1
      });
    } else {
      const { status } = await requestMediaLibraryPermissionsAsync();
      if (status !== "granted") return Alert.alert("权限被拒绝", `需要文件访问权限才能选择文件`);
      result = await launchImageLibraryAsync({
        mediaTypes: mode,
        allowsEditing: false,
        quality: UPLOAD_QUALITY,
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
  const loading = useMyState(false);
  const submitFile = useCallback(async () => {
    const file = await UriToRNFile(cachePath.path);
    if (file.uri === "") return;
    loading.set(true);
    try {
      await fetchData(
        reqUpload,
        [{
          taskId: TaskIndex,
          penId: PenId,
          files: [file]
        }],
        async (res) => {

          logger("console", "uploadResponse", res);
          const resURL = handleUploadURL(res.data.outputPicturePath[0]);
          logger("console", "resURL", resURL);
          const file = await DownloadFile(resURL);
          logger("console", "downloadFile", file);
          // Log.set(draft => {
          //   draft.ResponseDataURL = res.data.outputPicturePath[0];
          //   draft.HandledURL = resURL;
          //   draft.DownloadFileURI = file.uri;
          //   draft.FinalURL = file.uri || resURL;
          // });
          file.uri = file.uri || resURL;
          logger("console", "SavedUploadURL=>", file.uri);
          switch (cachePath.type) {
            case "images":
              setPreviewImg(file);
              break;
            case "videos":
              setPreviewVideo(file);
          }
          updateTaskList(TaskIndexTuple, file.uri, cachePath.type, res.data.count[0], res.data.count[0]);
          setIsUpload(true);
        },
        (res, createToast) => {
          createToast("处理出错！", res?.message);
        },
        toast
      );
    } finally {
      loading.set(false);
    }
  }, [PenId, TaskIndex, TaskIndexTuple, cachePath.path, cachePath.type, loading, toast]);
  const confirmData = useCallback(() => {

  }, []);
  const addArtifact = useCallback((res: number) => {
    updateTaskList(TaskIndexTuple, _, _, _, res);
  }, [TaskIndexTuple]);
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
      <View className="flex-1 relative">
        <Image
          source={background}
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            inset: 0
          }}
          contentFit={"cover"}
        />
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
              content={isOnceUpload.current ? `{${routeTitle.current}}` : `对应区域：{${routeTitle.current}}`}
              emphasizeColor="#409eff"
              normalColor="#333"
            />
          } containerStyle={{ backgroundColor: "none" }} />
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
