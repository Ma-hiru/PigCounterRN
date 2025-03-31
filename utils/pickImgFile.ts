import { launchImageLibraryAsync } from "expo-image-picker";
import { EncodingType, readAsStringAsync } from "expo-file-system";


export const pickImgFile = async () => {
  const result = await launchImageLibraryAsync({
    mediaTypes: "images",
    allowsMultipleSelection: false,
    quality: 1,
    selectionLimit: 1,
    allowsEditing: true,
    base64: false
  });
  if (!result.canceled) {
    const fileInfo = result.assets[0];
    const blob = await readAsStringAsync(fileInfo.uri, {
      encoding: EncodingType.Base64
    });
    return {
      uri: fileInfo.uri,
      type: fileInfo.mimeType || "image/jpeg",
      name: fileInfo.uri.split("/").pop(),
      data: `data:${fileInfo.mimeType || "image/jpeg"};base64,${blob}`
    } as unknown as Blob;
  }
};
