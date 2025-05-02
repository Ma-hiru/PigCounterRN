import { Log } from "@/utils/logger";
import { getInfoAsync } from "expo-file-system";
import { ImagePickerAsset } from "expo-image-picker";

/** @description 仅仅是格式转换，不保存 */
export const AssetsToRNFile = (file: ImagePickerAsset): RNFile => {
  {
    const { uri, type } = file;
    //TODO
    const cleanUri = uri.replace("file://", "");
    const fileName = cleanUri.split("/").pop()!;
    const fileExt = fileName.split(".").pop();
    const mimeType = getMimeType(type || fileExt);
    return {
      uri,
      name: fileName,
      type: mimeType
    };
  }
};
/** @description 读取本地URI转换成RNFile格式 */
export const UriToRNFile = async (uri: string): Promise<RNFile> => {
  const ok = await checkFile(uri);
  if (!ok) return { uri: "", name: "", type: "" };
  return parseFileMeta(uri);
};
/** @description 检查本地是否存在该URI文件 */
export const checkFile = async (uri: string): Promise<boolean> => {
  try {
    const { exists } = await getInfoAsync(uri);
    return exists;
  } catch (err) {
    Log.Echo({ err });
    return false;
  }
};
const parseFileMeta = (uri: string): RNFile => {
  const cleanUri = uri.replace("file://", "");
  const fileName = cleanUri.split("/").pop()!;
  const fileExt = fileName.split(".").pop();
  const mimeType = getMimeType(fileExt);
  return { uri, name: fileName, type: mimeType };
};
/** @description 获取预设MimeType */
export const getMimeType = (ext?: string) => {
  if (ext) {
    if (ext in mimeTypes) return mimeTypes[ext as keyof typeof mimeTypes];
    else if (ext === "image") return mimeTypes.jpg;
    else if (ext === "video") return mimeTypes.mp4;
  }
  return "application/octet-stream";
};

const mimeTypes = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  mp4: "video/mp4",
  png: "image/png"
} as const;
