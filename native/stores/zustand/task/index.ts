import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { TaskConfig } from "@/stores/zustand/task/config";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { isDev } from "@/utils/isDev";


const middleware = immer(
  isDev
    ? TaskConfig
    : persist(
      TaskConfig,
      {
        name: "task",
        storage: createJSONStorage(() => AsyncStorage)
      }
    )
);
export const useTaskZustandStore = create<ReturnType<typeof TaskConfig>>()(middleware);
