import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { TaskConfig } from "@/stores/zustand/task/config";
// import { persist, createJSONStorage } from "zustand/middleware";
// import AsyncStorage from "@react-native-async-storage/async-storage";

export const useTaskZustandStore = create<ReturnType<typeof TaskConfig>>()(
  immer(
    // persist(
    TaskConfig
    //   {
    //     name: "task",
    //     storage: createJSONStorage(() => AsyncStorage)
    //   }
    // )
  )
);
