import { setImageScale } from "@/utils/setImageScale";
import { MyState, useMyState } from "@/hooks/useMyState";
import { ImageLoadEventData, ImageSource } from "expo-image";
import { useCallback, useMemo } from "react";

export const useImageLoadedScale = (source: ImageSource | number, defaultScale: number = 1) => {
  const scale = useMyState(defaultScale);
  const updater = setImageScale(scale.get(), scale.set);
  return useMemo(() => ({
    source,
    style: { width: "100%", aspectRatio: scale.get() },
    onLoad: updater,
    contentFit: "contain"
  } as const), [scale, source, updater]);
};
export const useImageScale = (defaultScale: number = 1): [scale: MyState<number>, updater: (e: ImageLoadEventData) => void] => {
  const scale = useMyState(defaultScale);
  const updater = useCallback(() => {
    return setImageScale(scale.get(), scale.set);
  }, [scale]);
  return [scale, updater];
};
