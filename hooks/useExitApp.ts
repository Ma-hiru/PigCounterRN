import { useFocusEffect, useNavigation } from "expo-router";
import { ExitApp } from "@/utils/exitAPP";

export const useExitApp = () => {
  useFocusEffect(ExitApp(useNavigation()));
};
