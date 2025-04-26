import {
  ImagePickerOptions,
  launchCameraAsync,
  launchImageLibraryAsync,
  requestCameraPermissionsAsync,
  requestMediaLibraryPermissionsAsync
} from "expo-image-picker";
import { Log } from "@/utils/logger";
import { useToast } from "@/components/ui/toast";
import { CACHE_DIR, UPLOAD_AVATAR_QUALITY } from "@/settings";
import { AssetsToRNFile, UriToRNFile } from "@/utils/convertToRNFile";
import {
  copyAsync,
  deleteAsync,
  getInfoAsync,
  downloadAsync,
  cacheDirectory,
  readDirectoryAsync,
  makeDirectoryAsync
} from "expo-file-system";

const getCachePath = async (fileName: string): Promise<string> => {
  if (cacheDirectory === null) return "";
  const { exists } = await getInfoAsync(cacheDirectory + CACHE_DIR);
  try {
    if (!exists) {
      await makeDirectoryAsync(cacheDirectory + CACHE_DIR, { intermediates: false });
    }
    return cacheDirectory + CACHE_DIR + "/" + fileName;
  } catch (err) {
    Log.Echo({ err });
    return "";
  }
};
const TakeAssets = async (options: ImagePickerOptions, toast?: ReturnType<typeof useToast>) => {
  try {
    const { status } = await requestCameraPermissionsAsync();
    if (status !== "granted") {
      if (toast) Log.Message(toast, "权限被拒绝", "需要相机权限才能进行拍摄");
      else Log.AlertMessage("权限被拒绝", "需要相机权限才能进行拍摄");
      return null;
    }
    const res = await launchCameraAsync(options);
    if (res.canceled) return null;
    return res;
  } catch (err) {
    Log.Echo({ err });
    return null;
  }
};
const TakeAssetsRNFile = async (options: ImagePickerOptions, toast?: ReturnType<typeof useToast>) => {
  const res = await TakeAssets(options, toast);
  if (!res) return res;
  return AssetsToRNFile(res.assets[0]);
};
const PickAssets = async (options: ImagePickerOptions, toast?: ReturnType<typeof useToast>) => {
  try {
    const { status } = await requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      if (toast) Log.Message(toast, "权限被拒绝", "需要文件访问权限才能选择文件");
      else Log.AlertMessage("权限被拒绝", "需要文件访问权限才能选择文件");
      return null;
    }
    const res = await launchImageLibraryAsync(options);
    if (res.canceled) return null;
    return res;
  } catch (err) {
    Log.Echo({ err });
    return null;
  }
};
const PickAssetsRNFile = async (options: ImagePickerOptions, toast?: ReturnType<typeof useToast>) => {
  const res = await PickAssets(options, toast);
  if (!res) return res;
  return AssetsToRNFile(res.assets[0]);
};
const PickAvatar = async (success: (file: RNFile) => void, toast?: ReturnType<typeof useToast>) => {
  const res = await fileSystem.PickAssets({
    mediaTypes: "images",
    quality: UPLOAD_AVATAR_QUALITY,
    selectionLimit: 1,
    allowsEditing: true
  }, toast);
  if (!res) return;
  const result = AssetsToRNFile(res.assets[0]);
  success(result);
};
export const DownloadFile = async (url: string): Promise<RNFile | null> => {
  if (cacheDirectory === null) return null;
  const fileName = url.split("/").pop()!;
  const downloadPath = await getCachePath(fileName);
  const file = await UriToRNFile(downloadPath);
  if (file.uri !== "") return file;
  try {
    const { uri } = await downloadAsync(
      url,
      downloadPath
    );
    if (uri === "") return Promise.reject(null);
    const data = await UriToRNFile(uri);
    if (data.uri === "") return Promise.reject(null);
    return Promise.resolve(data);
  } catch (error) {
    Log.Echo({ error });
    return Promise.reject(null);
  }
};
export const SaveFile = async (uri: string, fileName: string, success?: (file: RNFile) => any) => {
  if (cacheDirectory === null) return;
  const cachePath = await getCachePath(fileName);
  try {
    await copyAsync({
      from: uri,
      to: cachePath
    });
    if (success) {
      const file = await UriToRNFile(cachePath);
      success(file);
    }
  } catch (err) {
    Log.Echo({ err });
    Log.Toast("资源存储失败,请检查权限！", "SHORT", "BOTTOM");
  }
};
export const RemoveFile = async (uri: string, handler?: (ok: boolean) => void) => {
  let ok = true;
  try {
    const { exists } = await getInfoAsync(uri);
    exists && await deleteAsync(uri, { idempotent: false });
  } catch (err) {
    Log.Echo({ err });
    Log.Toast("资源删除失败，请检查权限！", "SHORT", "BOTTOM");
    ok = false;
  } finally {
    if (handler) {
      handler(ok);
    }
  }
};

export * from "expo-file-system";
export const fileSystem = {
    TakeAssets,
    PickAssets,
    PickAvatar,
    TakeAssetsRNFile,
    PickAssetsRNFile,
    DownloadFile,
    SaveFile,
    RemoveFile,
    copyAsync,
    deleteAsync,
    getInfoAsync,
    downloadAsync,
    cacheDirectory,
    readDirectoryAsync
  }
;
