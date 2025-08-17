import { type Router } from "vue-router";
import RootState from "@/stores/redux";
import Logger from "@/utils/logger.ts";

export const beforeEach: Parameters<Router["beforeEach"]>[number] = (to) => {
  const { token } = RootState.getState().userStore;
  if (!token && to.name !== "login") return { name: "login" };
};
export const onErr: Parameters<Router["onError"]>[number] = () => {
  Logger.Message.Error("页面加载失败");
};
