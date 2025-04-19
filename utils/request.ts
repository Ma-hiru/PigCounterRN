import axios from "axios";
import { baseUrl, tokenPrefix } from "@/settings";
import RootState, { userActions } from "@/stores";
import logger from "@/utils/logger";

const { setToken } = userActions;
const { dispatch } = RootState;

/** axios实例 */
const request = axios.create({
  timeout: 5000,
});
/** 请求拦截器 */
request.interceptors.request.use(config => {
  const { token } = RootState.getState().userStore;
  config.headers.Authorization = tokenPrefix + token;
  // config.headers.setAuthorization(tokenPrefix + token);
  if (config.url) {
    if (!(config.url.startsWith("http")))
      config.url = new URL(config.url, baseUrl).href;
  }
  logger("console", "config=>", config);
  return config;
});
/** 响应拦截器 */
request.interceptors.response.use(
  res => {
    const newToken = res.headers["x-auth-token"] || res.headers.authorization;
    if (newToken) dispatch(setToken(newToken));
    return res.data;
  },
  err => {
    console.log({ ...err });
  }
);

export default request;



