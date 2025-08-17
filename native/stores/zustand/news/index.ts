import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { NewsConfig } from "@/stores/zustand/news/config";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { isDev } from "@/utils/isDev";

const middleware = immer(
  isDev
    ? NewsConfig
    : persist(
      NewsConfig,
      {
        name: "news",
        storage: createJSONStorage(() => AsyncStorage)
      }
    )
);
export const useNewsZustandStore = create<ReturnType<typeof NewsConfig>>()(middleware);
