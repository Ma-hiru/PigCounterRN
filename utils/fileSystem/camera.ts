import {
  ImagePickerOptions,
  launchCameraAsync,
  requestCameraPermissionsAsync
} from "expo-image-picker";
import fileUtils from "@/utils/fileSystem/utils";
import { Log } from "@/utils/logger";
import fileConvert from "./convert";
import { useToast } from "@/components/ui/toast";

const { AssetsToRNFile } = fileConvert;
const { showTips } = fileUtils;

/** @desc `摄像头拍摄` */
async function TakeAssets(options: ImagePickerOptions, toast?: ReturnType<typeof useToast>) {
  try {
    const { status } = await requestCameraPermissionsAsync();
    switch (status) {
      case "denied":
        showTips("权限被拒绝", "需要相机权限才能进行拍摄", toast);
        return null;
      case "undetermined":
        showTips("权限未授予", "需要相机权限才能进行拍摄", toast);
        return null;
    }
    const res = await launchCameraAsync(options);
    return res.canceled ? null : res;
  } catch (err) {
    showTips("访问相机出错", "请检查相机权限或设备状态", toast);
    Log.Echo({ err });
    return null;
  }
}

/** @desc `摄像头拍摄，返回RNFile` */
async function TakeAssetsRNFile(options: ImagePickerOptions, toast?: ReturnType<typeof useToast>) {
  const res = await TakeAssets(options, toast);
  return res && AssetsToRNFile(res.assets[0]);
}

export default {
  TakeAssets,
  TakeAssetsRNFile
};
