import Logger from "@/utils/logger";
import { getInfoAsync } from "expo-file-system";
import { ImagePickerAsset } from "expo-image-picker";
import logger from "@/utils/logger";


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
export const UriToRNFile = async (uri: string): Promise<RNFile> => {
  const ok = await checkFile(uri);
  if (!ok) return { uri: "", name: "", type: "" };
  return parseFileMeta(uri);
};
export const UriToBlob = async (file: RNFile): Promise<Blob | null> => {
  const { uri } = file;
  try {
    const response = await fetch(uri);
    const blob = await response.blob();
    logger("console", "blob",{...blob});
    return blob;
  } catch (error) {
    Logger("console", error);
    return null;
  }
};
const checkFile = async (uri: string): Promise<boolean> => {
  try {
    const { exists } = await getInfoAsync(uri);
    return exists;
  } catch (e) {
    Logger("console", e);
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
