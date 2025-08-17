import { ref, onMounted, onUnmounted } from "vue";
import { useSyncExternalStore } from "react";
import AppSettings from "@/settings";

export function useDeviceSizeVue(size: keyof typeof AppSettings.screensConfig, mode: "min" | "max") {
  const mediaQuery = window.matchMedia(`(${mode}-width: ${AppSettings.screensConfig[size]}px)`);
  const res = ref(mediaQuery.matches);
  onMounted(() => {
    const handler = (event: MediaQueryListEvent) => {
      res.value = event.matches;
    };
    mediaQuery.addEventListener("change", handler);
    onUnmounted(() => {
      mediaQuery.removeEventListener("change", handler);
    });
  });
  return res;
}


export const useDeviceSizeReact = (size: keyof typeof AppSettings.screensConfig, mode: "min" | "max") => {
  const mediaQuery = window.matchMedia(`(${mode}-width: ${AppSettings.screensConfig[size]}px)`);
  const subscribe = (handler: () => any) => {
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  };
  return useSyncExternalStore(subscribe, () => mediaQuery.matches, () => false);
};




