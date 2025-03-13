/** 基本URL */
export const baseUrl = "https://shiina-mahiru.cn:4000";

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
  LOGIN_URL = "https://shiina-mahiru.cn/api/file/user",
  REGISTRY_URL = "/registry",
  GET_USERINFO_URL = "/api/getUserInfo",
  LOGOUT_URL = "/logout",
}

export const GlobalStyles = {
  ThemeColor: "#409eff",
  TabBarBg:"#ffffff"
};
