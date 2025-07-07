import {
  cacheDirectory,
  copyAsync,
  deleteAsync,
  downloadAsync,
  getInfoAsync
} from "expo-file-system";
import fileConvert from "./convert";
import { Log } from "@/utils/logger";
import fileUtils from "./utils";

const { checkFile, UriToRNFile } = fileConvert;
const { getCachePath, getDefaultFileName } = fileUtils;

/** @desc `下载在线URL文件` */
async function DownloadFile(url: string, name?: string) {
  if (cacheDirectory === null) return null;
  //简单通过分割 / 获取文件名
  const fileName = name || url.split("/").pop() || getDefaultFileName();
  const downloadPath = await getCachePath(fileName);
  const oldFile = await UriToRNFile(downloadPath);
  if (oldFile.uri !== "") return oldFile;
  try {
    const { uri } = await downloadAsync(
      url,
      downloadPath
    );
    const data = await UriToRNFile(uri);
    return data.uri === "" ? null : data;
  } catch (error) {
    Log.Toast("资源下载失败", "SHORT", "BOTTOM");
    Log.Echo({ error });
    return null;
  }
}

/** @desc `持久化缓存` */
async function SaveFile(uri: string, fileName: string, success?: (file: RNFile) => any) {
  const exist = await checkFile(uri);
  if (cacheDirectory === null || !exist) return null;

  const cachePath = await getCachePath(fileName);
  try {
    await copyAsync({
      from: uri,
      to: cachePath
    });
    const file = await UriToRNFile(cachePath);
    const res = await checkFile(file.uri);
    if (res) {
      success && success(file);
      return file;
    } else {
      return null;
    }
  } catch (err) {
    Log.Echo({ err });
    Log.Toast("资源存储失败,请检查权限！", "SHORT", "BOTTOM");
    return null;
  }
}

async function RemoveFile(uri: string, handler?: (ok: boolean) => void) {
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
}

export default {
  DownloadFile,
  SaveFile,
  RemoveFile
};
