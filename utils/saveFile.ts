import { UriToRNFile } from "@/utils/convertToRNFile";
import Logger from "@/utils/logger";
import { cacheDirectory, copyAsync, deleteAsync, getInfoAsync } from "expo-file-system";
import { ToastAndroid } from "react-native";

export const saveFile = async (uri: string, fileName: string, success?: (file: RNFile) => any) => {
  const cachePath = `${cacheDirectory}${fileName}`;
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
    Logger("console", err);
    ToastAndroid.showWithGravity("资源存储失败,请检查权限！", ToastAndroid.SHORT, ToastAndroid.BOTTOM);
  }
};
export const removeFile = async (uri: string, handler?: (ok: boolean) => void) => {
  let ok = true;
  try {
    const { exists } = await getInfoAsync(uri);
    exists && await deleteAsync(uri, { idempotent: true });
  } catch (err) {
    Logger("console", err);
    ToastAndroid.showWithGravity("资源删除失败,请检查权限！", ToastAndroid.SHORT, ToastAndroid.BOTTOM);
    ok = false;
  } finally {
    if (handler) {
      handler(ok);
    }
  }
};
