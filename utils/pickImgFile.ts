import { AssetsToRNFile } from "@/utils/convertToRNFile";
import { Log } from "@/utils/logger";
import {
  launchImageLibraryAsync
} from "expo-image-picker";
import { UPLOAD_AVATAR_QUALITY } from "@/settings";

//TODO remove cache
export const pickImgFile = async () => {
  try {
    const result = await launchImageLibraryAsync({
      mediaTypes: "images",
      allowsMultipleSelection: false,
      quality: UPLOAD_AVATAR_QUALITY,
      selectionLimit: 1,
      allowsEditing: true
    });
    if (!result.canceled) {
      return AssetsToRNFile(result.assets[0]);
    }
  } catch (err) {
    Log.Echo({ err });
  }
  return null;
};
