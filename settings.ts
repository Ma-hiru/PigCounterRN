import { StyleSheet } from "react-native";
import localStore from "@/utils/localStore";

/** baseURL */
export const DEFAULT_BASE_URL = "https://renmen321.cn:8080";
export const DEFAULT_UPLOAD_QUALITY = 0.4;
export let baseUrl = DEFAULT_BASE_URL;
export let UPLOAD_QUALITY = DEFAULT_UPLOAD_QUALITY;
localStore.getItem("baseUrl").then((data) => {
  if (data !== "") {
    baseUrl = data;
  } else {
    localStore.setItem("baseUrl", DEFAULT_BASE_URL).then();
  }
});
localStore.getItem("UPLOAD_QUALITY").then((data) => {
  if (data !== "") {
    const num = Number(data);
    if (Number.isNaN(num)) UPLOAD_QUALITY = DEFAULT_UPLOAD_QUALITY;
    else UPLOAD_QUALITY = num;
  } else {
    localStore.setItem("UPLOAD_QUALITY", String(DEFAULT_UPLOAD_QUALITY)).then();
  }
});
export const ChangeAppBaseUrl = async (url: string) => {
  baseUrl = url;
  await localStore.setItem("baseUrl", url);
};
export const ChangeAppUploadQuality = async (quality: number) => {
  UPLOAD_QUALITY = quality;
  await localStore.setItem("UPLOAD_QUALITY", String(quality));
};
const weatherUrl = "https://shiina-mahiru.cn/weatherIcon";

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
export const GlobalStyles = {
  ...StyleSheet.create({}),
  WeatherIcon: {
    style: "fill",
    color: "white",
    defaultIcon: 100
  },
  ThemeColor: "#409eff",
  SecondColor: "rgba(248,248,0,0.98)",
  SecondColor2: "#f4c743",
  PressColorBlue: "#1280f2",
  PositiveColor: "rgb(52,131,82)",
  NegativeColor: "#ffffff",
  ErrorColor: "rgb(230,53,53)",
  TabBarBg: "#ffffff",
  HeaderBg: "#ffffff",
  HeaderText: "#000000",
  TagsText: "#ffffff",
  UploadCardBg: "#ffffff",
  UploadCardColor: "#000000",
  ThemeColor1: "#5c92c1",
  ThemeColor2: "#dcecfb",
  ThemeColor3: "#99b8d5",
  ThemeColor4: "#bad0e8",
  ThemeColor5: "rgba(64,158,255,0.93)",
  DisabledColor: "#c8c8c8",
  FocusBorderColor: "#000000",
  DefaultBorderColor: "#666666"
} as const;

export const LOCAL_SECRET_KEY = "Mahiru";
export const DEFAULT_MY_BG_SCALE = 1.91;
export const DEFAULT_UPLOAD_RES = -1;
export const DEFAULT_UPLOAD_PATH = "";
export const DEFAULT_UPLOAD_TYPE = "";
export const APP_NAME = "牧豕云鉴";
export const APP_VERSION = "1.1.1";
export const APP_WELCOME = `一拍即“数”，“牧”养无忧`;
export const RES_TIMEOUT = 20000;
export const UPLOAD_AVATAR_QUALITY = 0.5;
export const UPLOAD_FEEDBACK_QUALITY = 0.5;
export const CACHE_DIR = "cacheDir";
export const NO_LOGIN_TIPS = "登录之后再开始吧！";
