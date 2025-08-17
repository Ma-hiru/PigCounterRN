import axios from "axios";
import AppSettings from "@/settings";
import RootState, { userActions } from "@/stores/redux";
import Logger from "@/utils/logger.ts";
import { logout } from "@/utils/logout.ts";
import router from "@/vueRouter";

const { setToken } = userActions;
const { dispatch } = RootState;
const request = axios.create({
  timeout: 5000
});
request.interceptors.request.use(config => {
  const { token } = RootState.getState().userStore;
  config.headers.Authorization = AppSettings.tokenPrefix + token || "";
  if (config.url)
    if (!(config.url.startsWith("http")))
      config.url = AppSettings.baseUrl + config.url;
  return config;
});
//TODO 权限认证、服务器错误处理
request.interceptors.response.use(
  res => {
    if (res?.headers?.Authorization)
      dispatch(setToken(res?.headers?.Authorization));
    if (res?.status === 401) {
      Logger.Message.Error("登录信息已过期，请重新登录！");
      logout();
      router.push({ name: "login" }).then();
    }
    if (res?.status === 500) {
      return NewResponseData(null, 500, false, "服务器错误，请稍后再试！");
    }
    return res?.data;
  },
  err => {
    Logger.Console(`请求出错！code:${err?.response?.status}`);
  }
);

export default request;

interface NewResponseData {
  <T>(): ReqResponse<T | null>;
  <T>(data?: T, code?: number, ok?: boolean, message?: string): ReqResponse<T>;
}

export const NewResponseData = (<T>(data?: T, code?: number, ok?: boolean, message?: string): ReqResponse<T | null> => {
  return {
    code: code || 0,
    ok: ok || false,
    message: message || "",
    data: data || null
  };
}) as NewResponseData;

