export const APP_NAME = "智牧云瞳";
export const APP_INFO = "一拍即“数”，“牧”养无忧";
export const DEFAULT_TASK_PAGE_SIZE = 20;
export const DEFAULT_TASK_PAGE_NUM = 1;
export const DEFAULT_EMPLOYEE_PAGE_SIZE = 10;
export const DEFAULT_EMPLOYEE_PAGE_NUM = 1;
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
