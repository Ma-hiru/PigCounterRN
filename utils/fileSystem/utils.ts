import { Log } from "@/utils/logger";
import { CACHE_DIR } from "@/settings.app";
import { useToast } from "@/components/ui/toast";
import { getInfoAsync, cacheDirectory, makeDirectoryAsync } from "expo-file-system";


/** @desc `获取缓存路径以便存储文件` */
async function getCachePath(fileName: string): Promise<string> {
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
}

/** @desc `显示提示` */
function showTips(title: string, desc: string, toast?: ReturnType<typeof useToast>) {
  if (toast) Log.Message(toast, title, desc);
  else Log.AlertMessage(title, desc);
}
/** @desc `获取默认文件名` */
function getDefaultFileName() {
  return `unname-${Date.now()}`;
}

export default {
  getCachePath,
  getDefaultFileName,
  showTips
};
