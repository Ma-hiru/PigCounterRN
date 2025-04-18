import { setImageScale } from "@/utils/setImageScale";
import { MyState, useMyState } from "@/hooks/useMyState";
import { ImageLoadEventData, ImageSource } from "expo-image";
import logger from "@/utils/logger";

export const useImageLoadedScale = (source: ImageSource | number, defaultScale: number = 1) => {
  const scale = useMyState(defaultScale);
  if (source === undefined) return;
  const updater = setImageScale(scale.get(), scale.set);
  return {
    source,
    style: { width: "100%", aspectRatio: scale.get() },
    onLoad: updater,
    contentFit: "contain"
  } as const;
};
export const useImageScale = (defaultScale: number = 1): [scale: MyState<number>, updater: (e: ImageLoadEventData) => void] => {
  const scale = useMyState(defaultScale);
  const updater = setImageScale(scale.get(), scale.set);
  return [scale, updater];
};
