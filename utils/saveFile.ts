import { UriToRNFile } from "@/utils/convertToRNFile";
import { Log } from "@/utils/logger";
import { cacheDirectory, copyAsync, deleteAsync, getInfoAsync } from "expo-file-system";

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
    Log.Echo({ err });
    Log.Toast("资源存储失败,请检查权限！", "SHORT", "BOTTOM");
  }
};
export const removeFile = async (uri: string, handler?: (ok: boolean) => void) => {
  let ok = true;
  try {
    const { exists } = await getInfoAsync(uri);
    exists && await deleteAsync(uri, { idempotent: true });
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
