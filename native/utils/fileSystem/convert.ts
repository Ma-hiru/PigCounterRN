import { Log } from "@/utils/logger";
import { deleteAsync, getInfoAsync } from "expo-file-system";
import { ImagePickerAsset } from "expo-image-picker";

const mimeTypes = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  mp4: "video/mp4",
  png: "image/png"
} as const;

export class RNFile implements RNFile {
  public readonly uri: string;
  public readonly name: string;
  public readonly type: string;
  public InitialExist: boolean;

  constructor(uri?: string, name?: string, type?: string) {
    this.uri = uri || "";
    this.name = name || "";
    this.type = type || "";
    this.InitialExist = true;

    const _this = this;
    checkFile(uri).then(ok => {
      Reflect.set(_this, "InitialExist", !ok, _this);
    });
  }

  toString() {
    return `RNFile: ${this.name} ${this.type} ${this.uri}`;
  }

  async IsExistAsync() {
    return await checkFile(Reflect.get(this, "uri", this));
  }

  async DeleteAsync() {
    return await removeRNFile(Reflect.get(this, "uri", this));
  }

  DeleteSync() {
    removeRNFile(Reflect.get(this, "uri", this)).then(ok => {
      if (!ok) Log.Toast("文件删除失败，请检查权限！", "SHORT", "BOTTOM");
    });
  }
}

/** @description `仅仅是格式转换，不保存` */
function AssetsToRNFile(file: ImagePickerAsset): RNFile {
  {
    const { uri, type } = file;
    //TODO
    const cleanUri = uri.replace("file://", "");
    const fileName = cleanUri.split("/").pop()!;
    const fileExt = fileName.split(".").pop();
    const mimeType = getMimeType(type || fileExt);
    return new RNFile(uri,
      fileName,
      mimeType);
  }
}

/** @description `读取本地URI转换成RNFile格式` */
async function UriToRNFile(uri: string): Promise<RNFile> {
  const ok = await checkFile(uri);
  if (!ok) return new RNFile();
  return parseFileMeta(uri);
}

/** @description `检查本地是否存在该URI文件` */
async function checkFile(uri?: string): Promise<boolean> {
  if (!uri) return false;
  try {
    const { exists } = await getInfoAsync(uri);
    return exists;
  } catch (err) {
    Log.Echo({ err });
    return false;
  }
}

/** @desc `推断文件meta信息` */
function parseFileMeta(uri: string): RNFile {
  const cleanUri = uri.replace("file://", "");
  const fileName = cleanUri.split("/").pop()!;
  const fileExt = fileName.split(".").pop();
  const mimeType = getMimeType(fileExt);
  return new RNFile(uri, fileName, mimeType);
}

/** @description `获取预设MimeType` */
function getMimeType(ext?: string) {
  if (ext) {
    if (ext in mimeTypes) return mimeTypes[ext as keyof typeof mimeTypes];
    else if (ext === "image") return mimeTypes.jpg;
    else if (ext === "video") return mimeTypes.mp4;
  }
  return "application/octet-stream";
}

/** @desc `删除RNFile` */
async function removeRNFile(uri: string) {
  let ok = true;
  try {
    const { exists } = await getInfoAsync(uri);
    exists && await deleteAsync(uri, { idempotent: false });
  } catch (err) {
    Log.Echo({ err });
    ok = false;
  }
  return ok;
}

export default {
  AssetsToRNFile,
  UriToRNFile,
  checkFile,
  parseFileMeta,
  getMimeType,
  removeRNFile,
  RNFile
};
