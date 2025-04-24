import {
  ImagePickerOptions,
  launchCameraAsync,
  launchImageLibraryAsync,
  requestCameraPermissionsAsync,
  requestMediaLibraryPermissionsAsync
} from "expo-image-picker";
import { Log } from "@/utils/logger";
import { useToast } from "@/components/ui/toast";
import { UPLOAD_AVATAR_QUALITY } from "@/settings";
import { AssetsToRNFile, UriToRNFile } from "@/utils/convertToRNFile";
import { cacheDirectory, downloadAsync } from "expo-file-system";

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
  const fileName = url.split("/").pop()!;
  const downloadPath = `${cacheDirectory}${fileName}`;
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

export const fileSystem = {
    TakeAssets,
    PickAssets,
    PickAvatar,
    TakeAssetsRNFile,
    PickAssetsRNFile,
    DownloadFile
  }
;
