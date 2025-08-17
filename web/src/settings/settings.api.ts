/** 基本URL */
export const BASE_URL = import.meta.env.VITE_URL;
export const baseUrl = BASE_URL;
export const WEATHER_KEY = import.meta.env.VITE_WEATHER_KEY;

/** token prefix type */
export enum tokenTypePrefix {
  /** BearerToken */
  Bearer = "Bearer ",
  /** BasicToken */
  Basic = "Basic ",
  /** NonePrefix */
  None = ""
}

/** The prefix of token in this project. */
export const tokenPrefix = tokenTypePrefix.None;

export const enum API {
  Add_Task = "/api/task/add",
  Get_Task = "/api/task/page",
  /** /task/detail/{taskId} */
  Get_Task_Detail = "/api/task/detail/",
  Get_Employee = "/api/user/page",
  /** /api/user/{id} */
  Del_Employee = "/api/user/",
  Edit_Employee = "/api/user",
  Add_Employee = "/api/user/register",
  Search_Employee = "/api/user/search",
  Add_Building = "/api/building/add",
  /** /api/building/{id} */
  Del_Building = "/api/building/",
  /** /api/building/{orgId} */
  Get_Building = Del_Building,
  Edit_Building = "/api/building",
  Add_Pen = "/api/pen/add",
  /** /api/pen/{id} */
  Del_Pen = "/api/pen/",
  Edit_Pen = "/api/pen",
  Login = "/api/user/login"
}
