import { ImageLoadEventData } from "expo-image";

export const setImageScale = (imgScale: number, setImgScale: (scale: number) => void) => {
  return (e: ImageLoadEventData) => {
    const { width, height } = e.source;
    const scale = width / height;
    scale !== imgScale && setImgScale(scale);
  };
};
