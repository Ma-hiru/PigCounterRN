import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { UserConfig } from "@/stores/zustand/user/config";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { isDev } from "@/utils/isDev";

const middleware = immer(
  isDev
    ? UserConfig
    : persist(
      UserConfig,
      {
        name: "user",
        storage: createJSONStorage(() => AsyncStorage)
      }
    )
);
export const useUserZustandStore = create<ReturnType<typeof UserConfig>>()(middleware);
