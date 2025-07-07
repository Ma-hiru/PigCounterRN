import { Log } from "@/utils/logger";
import fileConvert from "./convert";
import { UPLOAD_AVATAR_QUALITY } from "@/settings.app";
import { useToast } from "@/components/ui/toast";
import {
  ImagePickerOptions,
  launchImageLibraryAsync,
  requestMediaLibraryPermissionsAsync
} from "expo-image-picker";
import fileUtils from "@/utils/fileSystem/utils";

const { AssetsToRNFile } = fileConvert;
const { showTips } = fileUtils;

/** @desc `选择本地媒体资源` */
async function PickAssets(options: ImagePickerOptions, toast?: ReturnType<typeof useToast>) {
  try {
    const { status } = await requestMediaLibraryPermissionsAsync();
    switch (status) {
      case "denied":
        showTips("权限被拒绝", "需要文件访问权限才能选择文件", toast);
        return null;
      case "undetermined":
        showTips("权限未授予", "需要文件访问权限才能选择文件", toast);
        return null;
    }
    const res = await launchImageLibraryAsync(options);
    return res.canceled ? null : res;
  } catch (err) {
    showTips("访问文件出错", "请检查权限或设备状态", toast);
    Log.Echo({ err });
    return null;
  }
}

/** @desc `选择本地媒体资源，返回RNFile` */
async function PickAssetsRNFile(options: ImagePickerOptions, toast?: ReturnType<typeof useToast>) {
  const res = await PickAssets(options, toast);
  return res && AssetsToRNFile(res.assets[0]);
}

/** @desc `选择本地媒体资源作为头像` */
async function PickAvatar(success: (file: RNFile) => void, toast?: ReturnType<typeof useToast>) {
  const res = await PickAssets({
    mediaTypes: "images",
    quality: UPLOAD_AVATAR_QUALITY,
    selectionLimit: 1,
    allowsEditing: true
  }, toast);
  res && success(AssetsToRNFile(res.assets[0]));
}


export default {
  PickAssets,
  PickAssetsRNFile,
  PickAvatar
};
