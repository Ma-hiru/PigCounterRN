import { StyleSheet } from "react-native";

/** baseURL */
// export const baseUrl = "https://shiina-mahiru.cn:4000";
export const baseUrl = "http://127.0.0.1:8080";

/** token prefix type */
export enum tokenTypePrefix {
  /** BearerToken */
  Bearer = "Bearer ",
  /** NonePrefix */
  None = ""
}

/** The prefix of token in this project. */
export const tokenPrefix = tokenTypePrefix.None;

export enum API {
  // LOGIN_URL = "https://shiina-mahiru.cn/sub/pigcounter/api/login",
  LOGIN_URL = "/api/user/login",
  REGISTRY_URL = "/api/user/register",
  UPLOAD_URL = "/api/task/upload",
  // GET_USERINFO_URL = "/api/getUserInfo",
  // LOGOUT_URL = "/logout",
}

export const GlobalStyles = {
  ...StyleSheet.create({}),
  ThemeColor: "#409eff",
  PressColorBlue: "#1280f2",
  PositiveColor: "rgb(52,131,82)",
  NegativeColor: "#ffffff",
  ErrorColor: "rgb(230,53,53)",
  TabBarBg: "#ffffff",
  HeaderBg: "#ffffff",
  HeaderText: "#000000",
  TagsText:"#ffffff",
  UploadCardBg: "#ffffff",
  UploadCardColor: "#000000",
  ThemeColor1: "#5c92c1",
  ThemeColor2: "#dcecfb",
  ThemeColor3: "#99b8d5",
  ThemeColor4: "#bad0e8",
  ThemeColor5: "rgba(64,158,255,0.93)",
  DisabledColor: "#c8c8c8",
} as const;

export const LOCAL_SECRET_KEY = "Mahiru";
export const DEFAULT_MY_BG_SCALE = 1.91;
export const DEFAULT_UPLOAD_RES = -1;
export const DEFAULT_UPLOAD_PATH = "";
export const DEFAULT_UPLOAD_TYPE = "";
