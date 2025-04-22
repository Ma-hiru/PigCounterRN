import * as userAPI from "./moudule/userAPI";
import * as uploadAPI from "./moudule/uploadAPI";
import * as taskAPI from "./moudule/taskAPI";
import * as manageAPI from "./moudule/manageAPI";

export const API = {
  ...userAPI,
  ...uploadAPI,
  ...taskAPI,
  ...manageAPI
};
