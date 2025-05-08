import localStore from "@/utils/localStore";

export const DEFAULT_UPLOAD_QUALITY = 0.4;
export let UPLOAD_QUALITY = DEFAULT_UPLOAD_QUALITY;
localStore.getItem("UPLOAD_QUALITY").then((data) => {
  if (data !== "") {
    const num = Number(data);
    if (Number.isNaN(num)) UPLOAD_QUALITY = DEFAULT_UPLOAD_QUALITY;
    else UPLOAD_QUALITY = num;
  } else {
    localStore.setItem("UPLOAD_QUALITY", String(DEFAULT_UPLOAD_QUALITY)).then();
  }
});
export const ChangeAppUploadQuality = async (quality: number) => {
  UPLOAD_QUALITY = quality;
  await localStore.setItem("UPLOAD_QUALITY", String(quality));
};

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
export const NO_ACTIVE_TASK = "暂无活跃任务，休息一下吧！";
export const DEFAULT_BASE_TASK_VAL: BaseTask = {
  id: -1,
  taskName: "",
  employeeId: -1,
  startTime: "",
  endTime: "",
  valid: false
};
export const DEFAULT_TASK_VAL: Task = {
  ...DEFAULT_BASE_TASK_VAL,
  buildings: [
    {
      buildingId: -1,
      buildingName: "",
      pens: [
        {
          penId: -1,
          penName: "",
          count: -1,
          manualCount: -1,
          picturePath: "",
          outputPicturePath: "",
          status: false,
          type: ""
        }
      ]
    }
  ]
};
