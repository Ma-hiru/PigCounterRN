import * as expoFileSystem from "expo-file-system";
import picker from "./picker";
import file from "./file";
import camera from "./camera";
import convert from "./convert";

export * from "expo-file-system";
export const fileSystem = {
  ...picker,
  ...camera,
  ...file,
  ...convert,
  ...expoFileSystem
};

export default {
  ...fileSystem
};
