import axios from "axios";
import { baseUrl, tokenPrefix } from "@/settings";
import RootState, { useUserStore } from "@/stores";


export const request = axios.create({
  timeout: 5000,
});
request.interceptors.request.use(config => {
  config.headers.Authorization = tokenPrefix + RootState.getState().userStore.token;
  if (config.url)
    if (!(config.url.startsWith("http")))
      config.url = new URL(config.url, baseUrl).href;
  console.log(config);
  return config;
});
request.interceptors.response.use(res => {
  const newToken = res.headers["x-auth-token"] || res.headers.authorization;
  if (newToken) {
    RootState.dispatch(useUserStore.actions.setToken(newToken));
  }
  return res.data;
}, err => {
  console.log(`请求出错！${err}`);
});


