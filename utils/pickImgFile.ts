import { AssetsToRNFile } from "@/utils/convertToRNFile";
import Logger from "@/utils/logger";
import {
  ImagePickerOptions,
  ImagePickerSuccessResult,
  launchImageLibraryAsync,
} from "expo-image-picker";

//TODO remove cache
export const pickImgFile = async () => {
  try {
    const result = await launchImageLibraryAsync({
      mediaTypes: "images",
      allowsMultipleSelection: false,
      quality: 0.5,
      selectionLimit: 1,
      allowsEditing: true
    });
    if (!result.canceled) {
      return AssetsToRNFile(result.assets[0]);
    }
  } catch (e) {
    Logger("console", e);
  }
  return null;
};
function formDataFromImagePicker(result: ImagePickerSuccessResult) {
  const formData = new FormData();
  for (const index in result.assets) {
    const asset = result.assets[index];
    // @ts-expect-error: special react native format for form data
    formData.append(`photo.${index}`, {
      uri: asset.uri,
      name: asset.fileName ?? asset.uri.split("/").pop(),
      type: asset.mimeType,
    });
    if (asset.exif) {
      formData.append(`exif.${index}`, JSON.stringify(asset.exif));
    }
  }
  return formData;
}
async function pickImage(options: ImagePickerOptions) {
  const result = await launchImageLibraryAsync({
    mediaTypes: "images",
    ...options
  });
  if (!result.canceled) {
    const response = await fetch("/api/img", {
      method: "POST",
      body: formDataFromImagePicker(result),
      headers: {
        Accept: "application/json"
      }
    });
    return await response.json();
  }
}
