import request from "@/utils/request";
import { API } from "@/settings";

/** 简略TASK(ALL) */
export const reqGetTask = (employeeId: number): Promise<ResponseData<GetTaskResponseData>> => request.get(API.GET_TASK_URL + employeeId);
/** 分页查询所有TASK */
export const reqTaskList = (taskQuery: getTaskQuery): Promise<ResponseData<GetTaskListResponseData>> => request.get(API.ALL_TASK_URL, {
  params: taskQuery
});
/** 详细TASK */
export const reqTaskInfo = (taskId: number): Promise<ResponseData<Task>> => request.get(API.TASK_INFO_URL + taskId);
export const reqConfirmTask = (taskId: number, penId: number, status: boolean, manualCount: number): Promise<ResponseData<object>> => request.post(API.TASK_CONFIRM_URL, {
  taskId,
  penId,
  status,
  manualCount
});
