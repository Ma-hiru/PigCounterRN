import { UriToRNFile } from "@/utils/convertToRNFile";
import Logger from "@/utils/logger";
import { cacheDirectory, downloadAsync } from "expo-file-system";

export const DownloadFile = async (url: string): Promise<RNFile> => {
  try {
    const fileName = url.split("/").pop()!;
    const downloadPath = `${cacheDirectory}${fileName}`;
    const { uri } = await downloadAsync(
      url,
      downloadPath
    );
    return UriToRNFile(uri);
  } catch (error) {
    Logger("console", error);
    return UriToRNFile("");
  }
};
