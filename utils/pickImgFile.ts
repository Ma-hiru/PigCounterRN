import { AssetsToRNFile } from "@/utils/convertToRNFile";
import Logger from "@/utils/logger";
import { launchImageLibraryAsync } from "expo-image-picker";

//TODO remove cache
export const pickImgFile = async () => {
  try {
    const result = await launchImageLibraryAsync({
      mediaTypes: "images",
      allowsMultipleSelection: false,
      quality: 1,
      selectionLimit: 1,
      allowsEditing: true,
    });
    if (!result.canceled) {
      return AssetsToRNFile(result.assets[0])
    }
  } catch (e) {
    Logger("console", e);
  }
  return null;
};
