import localStore from "@/utils/localStore";

/** baseURL */
const weatherUrl = "https://shiina-mahiru.cn/weatherIcon";
export const DEFAULT_BASE_URL = "https://renmen321.cn:8080";
export let baseUrl = DEFAULT_BASE_URL;
localStore.getItem("baseUrl").then((data) => {
  if (data !== "") {
    baseUrl = data;
  } else {
    localStore.setItem("baseUrl", DEFAULT_BASE_URL).then();
  }
});
export const ChangeAppBaseUrl = async (url: string) => {
  baseUrl = url;
  await localStore.setItem("baseUrl", url);
};
export enum tokenTypePrefix {
  /** Basic */
  Basic = "Basic ",
  /** Bearer */
  Bearer = "Bearer ",
  /** NonePrefix */
  None = ""
}
export const tokenPrefix = tokenTypePrefix.None;
export const enum API {
  /** put */
  UPDATE_USER_URL = "/api/user",
  LOGIN_URL = "/api/user/login",
  LOGOUT_URL = "/api/user/logout",
  REGISTRY_URL = "/api/user/register",
  /** api/user/${id} */
  USER_INFO_URL = "/api/user/",
  ALL_EMPLOYEE_URL = "/api/user/page",
  UPLOAD_URL = "/api/task/upload",
  ADD_TASK_URL = "/api/task/add",
  /** api/task/${id} */
  GET_TASK_URL = "/api/task/",
  ALL_TASK_URL = "/api/task/page",
  /** api/task/detail/${id} */
  TASK_INFO_URL = "/api/task/detail/",
  TASK_CONFIRM_URL = "/api/task/confirm",
  ADD_BUILDING = "/api/building/add",
  /** api/building/${id} */
  DELETE_BUILDING = "/api/building/"
}
export const GetWeatherIconUrl = (iconIndex: string | null | undefined, style: "fill" | "line", color: "white" | "black", defaultIcon: number) => {
  const prefix = weatherUrl + `/${color}/`;
  const suffix = `${style === "fill" ? "-fill" : ""}.svg`;
  const defaultUrl = prefix + defaultIcon + suffix;
  if (iconIndex === null || iconIndex === undefined) {
    return defaultUrl;
  }
  const id = Number(iconIndex);
  if (Number.isNaN(id)) {
    return defaultUrl;
  }
  return prefix + id + suffix;
};
