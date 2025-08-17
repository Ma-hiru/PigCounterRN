import axios from "axios";
import { baseUrl, RES_TIMEOUT, tokenPrefix } from "@/settings";
import { Log } from "@/utils/logger";
import { useUserZustandStore } from "@/stores/zustand/user";


/** axios实例 */
const request = axios.create({
  timeout: RES_TIMEOUT
});
/** 请求拦截器 */
request.interceptors.request.use(config => {
  const { token } = useUserZustandStore.getState();
  config.headers.Authorization = tokenPrefix + token;
  if (config.url) {
    if (!(config.url.startsWith("http")))
      config.url = new URL(config.url, baseUrl).href;
  }
  return config;
});
/** 响应拦截器 */
request.interceptors.response.use(
  res => {
    const newToken = res.headers["x-auth-token"] || res.headers.authorization;
    const { setToken } = useUserZustandStore.getState();
    if (newToken) setToken(newToken);
    return res.data;
  },
  err => {
    Log.Echo({ err });
  }
);

export default request;



