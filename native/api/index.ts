import * as userAPI from "./moudule/userAPI";
import * as uploadAPI from "./moudule/uploadAPI";
import * as taskAPI from "./moudule/taskAPI";

export const API = {
  ...userAPI,
  ...uploadAPI,
  ...taskAPI,
};
