import { UriToRNFile } from "@/utils/convertToRNFile";
import { Log } from "@/utils/logger";
import { cacheDirectory, downloadAsync } from "expo-file-system";

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
