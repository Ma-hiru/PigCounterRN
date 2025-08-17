import { setImageScale } from "@/utils/setImageScale";
import { useMyState } from "@/hooks/useMyState";
import { ImageSource } from "expo-image";
import { useMemo } from "react";

export const useImageLoadedScale = (source: ImageSource | number | string, defaultScale: number = 1) => {
  const scale = useMyState(defaultScale);
  const updater = setImageScale(scale.get(), scale.set);
  return useMemo(() => ({
    source: typeof source === "string" ? { uri: source } : source,
    style: { width: "100%", aspectRatio: scale.get() },
    onLoad: updater,
    contentFit: "contain"
  } as const), [scale, source, updater]);
};
