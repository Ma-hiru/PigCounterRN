import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
// import { persist, createJSONStorage } from "zustand/middleware";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserConfig } from "@/stores/zustand/user/config";

export const useUserZustandStore = create<ReturnType<typeof UserConfig>>()(
  immer(
    // persist(
    UserConfig
    //   {
    //     name: "user",
    //     storage: createJSONStorage(() => AsyncStorage)
    //   }
    // )
  )
);
