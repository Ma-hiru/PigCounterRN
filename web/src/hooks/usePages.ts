import { useRouter } from "vue-router";
import router from "@/vueRouter";

export const usePagesReact = () => {
  return router;
};
export const usePagesVue = () => {
  return useRouter();
};
