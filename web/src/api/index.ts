import * as NoticeAPI from "./moudules/NoticeAPI";
import * as CompanyAPI from "./moudules/CompanyAPI";
import * as EmployeeAPI from "./moudules/EmployeeAPI";
import * as TaskAPI from "./moudules/TaskAPI";
import * as UserAPI from "./moudules/UserAPI";

export const API = {
  ...NoticeAPI,
  ...CompanyAPI,
  ...EmployeeAPI,
  ...TaskAPI,
  ...UserAPI
};

