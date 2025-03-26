/** 基本URL */
import { Persistor, RootState } from "@/stores/persist";

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
export const tokenPrefix = tokenTypePrefix.Bearer;

export enum API {
  // LOGIN_URL = "https://shiina-mahiru.cn/sub/pigcounter/api/login",
  LOGIN_URL = "/api/user/login",
  REGISTRY_URL = "/api/user/register",
  // GET_USERINFO_URL = "/api/getUserInfo",
  // LOGOUT_URL = "/logout",
}

export const GlobalStyles = {
  ThemeColor: "#409eff",
  PressColorBlue: "#1280f2",
  PositiveColor: "rgb(52,131,82)",
  ErrorColor: "rgb(230,53,53)",
  TabBarBg: "#ffffff"
};
export const LOCAL_SECRET_KEY = "Mahiru";
export const DEFAULT_MY_BG_SCALE = 1.777;
