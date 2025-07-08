import {
  DEFAULT_UPLOAD_PATH,
  DEFAULT_UPLOAD_RES,
  DEFAULT_UPLOAD_TYPE,
  UPLOAD_QUALITY
} from "@/settings";
import { useFetchData } from "@/utils/fetchData";
import { FC, useCallback, useMemo, useRef, useState } from "react";
import { ScrollView, StatusBar, View } from "react-native";
import { ImagePickerResult } from "expo-image-picker";
import { useToast } from "@/components/ui/toast";
import ImagePreview from "@/components/upload/ImagePreview";
import UploadPagesPreviewCard from "@/components/upload/UploadPagesPreviewCard";
import UploadPagesOptionsCard from "@/components/upload/UploadPagesOptionsCard";
import { useGetRouteParam } from "@/hooks/useGetRouteParam";
import { Log } from "@/utils/logger";
import { handleServerURL } from "@/utils/handleServerURL";
import MyPortal from "@/components/MyPortal";
import { useMyState } from "@/hooks/useMyState";
import { fileSystem } from "@/utils/fileSystem";
import UploadFilesHeader from "@/components/upload/UploadFilesHeader";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useTaskZustandStore } from "@/stores/zustand/task";
import { useShallow } from "zustand/react/shallow";

const UploadFiles: FC = () => {
  /** 预览 */
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImg, setPreviewImg] = useState<RNFile>();
  const [previewVideo, setPreviewVideo] = useState<RNFile>();
  const [scale, setScale] = useState(1);
  const Pages = useRouter();

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
    TasksList: List,
    OnceTask: Once,
    updateTaskListPenPartial,
    updateOnceTaskPenPartial,
    updateTaskListPenStatus
  } = useStore();
  const TasksList = useMemo(() => {
    if (isOnceUpload) return [Once];
    return List;
  }, [List, Once]);

  const UpdateTaskList = useCallback((newPen: Partial<Pen>) => {
    if (isOnceUpload.current) updateOnceTaskPenPartial(newPen);
    else updateTaskListPenPartial(TaskIndexTuple, newPen);
  }, [TaskIndexTuple, updateOnceTaskPenPartial, updateTaskListPenPartial]);

  /** 获取缓存 */
  const HasConfirm = useMemo(() =>
      GetPen(TaskIndexTuple, TasksList).status
    , [TaskIndexTuple, TasksList]);

  const cachePath = useMemo(() => {
    const pen = GetPen(TaskIndexTuple, TasksList);
    if (HasConfirm && pen.outputPicturePath && pen.type === "") {
      const path = handleServerURL(pen.outputPicturePath, "upload");
      return {
        path,
        type: path.match("jpg") ? "images" : "videos"
      } as const;
    }
    return { path: pen.picturePath ?? "", type: pen.type ?? "" };
  }, [HasConfirm, TaskIndexTuple, TasksList]);

  const [cacheCount, peopleCacheCount] = useMemo(() => {
    const { count, manualCount } = GetPen(TaskIndexTuple, TasksList);
    return [count, manualCount].map(Number);
  }, [TaskIndexTuple, TasksList]);

  /** 选择、缓存图片 */
  const resolveTemp = useCallback(async (tempUri: string, mode: "save" | "delete", type?: "images" | "videos" | "") => {
    switch (mode) {
      case "save":
        await fileSystem.SaveFile(
          tempUri,
          `${Date.now()}.${type === "images" ? "jpeg" : "mp4"}`,
          (file) => {
            UpdateTaskList({
              picturePath: file.uri,
              type
            });
          });
        break;
      case "delete":
        await fileSystem.RemoveFile(tempUri, (_) => {
          UpdateTaskList({
            picturePath: DEFAULT_UPLOAD_PATH,
            type: DEFAULT_UPLOAD_TYPE,
            count: DEFAULT_UPLOAD_RES,
            manualCount: DEFAULT_UPLOAD_RES
          });
        });
    }
  }, [UpdateTaskList]);

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
    const fileInfo = fileSystem.AssetsToRNFile(file);
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
  const [isUpload, setIsUpload] = useState(cacheCount !== DEFAULT_UPLOAD_RES && cacheCount > 0);

  /** 提交 */
  const { fetchData, API } = useFetchData();
  const loading = useMyState(false);

  const submitFile = useCallback(async () => {
    const file = await fileSystem.UriToRNFile(cachePath.path);
    if (file.uri === "") return;
    loading.set(true);
    try {
      await fetchData(
        API.reqUpload,
        [{
          taskId: TasksList[TaskIndex].id,
          penId: PenId,
          files: [file]
        }],
        async (res) => {
          Log.Console("uploadResponse", res);
          const resURL = handleServerURL(res.data.outputPicturePath[0], "upload");
          Log.Echo({ resURL });
          const file = await fileSystem.DownloadFile(resURL);
          if (!file) {
            Log.Console("DownloadFile", "结果图片下载失败");
            Log.Toast("结果图片下载失败", "LONG", "BOTTOM");
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
          UpdateTaskList({
            picturePath: file.uri,
            type: cachePath.type,
            count: res.data.count[0],
            manualCount: res.data.count[0]
          });
          setIsUpload(true);
        },
        (res, createToast) => {
          createToast("处理出错！", res?.message);
        }
      );
    } finally {
      loading.set(false);
    }
  }, [API.reqUpload, PenId, TaskIndex, TasksList, UpdateTaskList, cachePath.path, cachePath.type, fetchData, loading]);

  const checkStatus = useCallback(() => {
    fetchData(
      API.reqTaskInfo,
      [TasksList[TaskIndex].id],
      (res) => {
        const BuildingId = TasksList[TaskIndex].buildings[BuildingIndex].buildingId;
        const resPen = res.data.buildings.find(building => building.buildingId === BuildingId)?.pens?.find(pen => pen.penId === PenId);
        if (resPen) {
          updateTaskListPenStatus(TaskIndexTuple, resPen.status);
          resPen.status && Pages.back();
        }
      },
      () => {
        Log.Toast("获取任务状态失败！", "LONG", "BOTTOM");
      }
    ).then();
  }, [API.reqTaskInfo, BuildingIndex, Pages, PenId, TaskIndex, TaskIndexTuple, TasksList, fetchData, updateTaskListPenStatus]);

  const confirmData = useCallback(() => {
    fetchData(
      API.reqConfirmTask,
      [TasksList[TaskIndex].id, PenId, true, peopleCacheCount],
      checkStatus,
      (res) => {
        Log.Toast(res?.message ?? "确认任务失败！请检查网络！", "LONG", "BOTTOM");
      }
    ).then();
  }, [API.reqConfirmTask, PenId, TaskIndex, TasksList, checkStatus, fetchData, peopleCacheCount]);

  const addArtifact = useCallback((res: number) => {
    UpdateTaskList({
      manualCount: res
    });
  }, [UpdateTaskList]);
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
      <LinearGradient
        colors={["#d7d2cc", "#d4fcfa", "#d4fcfa", "#d4fcfa", "#d7d2cc"]}
        style={{ flex: 1 }}
        end={{ x: 0, y: 0 }}
        start={{ x: 1, y: 1 }}
      >
        <View className="flex-1 relative">
          <UploadFilesHeader
            isUpload={isUpload}
            peopleCacheCount={peopleCacheCount}
            isOnceUpload={isOnceUpload.current}
            routeTitle={routeTitle.current}
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
                hasConfirm={HasConfirm}
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
      </LinearGradient>
    </>
  );
};
// noinspection JSUnusedGlobalSymbols
export default UploadFiles;


function useStore() {
  return useTaskZustandStore(
    useShallow(
      state => (
        {
          TasksList: state.TasksList,
          OnceTask: state.OnceTask,
          updateTaskListPenPartial: state.updateTaskListPenPartial,
          updateOnceTaskPenPartial: state.updateOnceTaskPenPartial,
          updateTaskListPenStatus: state.updateTaskListPenStatus
        }
      )
    )
  );
}

function GetPen(TaskIndexTuple: TaskIndexTuple, TasksList: TaskList) {
  return TasksList[TaskIndexTuple.TaskIndex].buildings[TaskIndexTuple.BuildingIndex].pens[TaskIndexTuple.PenIndex];
}
