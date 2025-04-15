import request from "@/utils/request";
import { API } from "@/settings";

export const reqAddTask = (task: Task): Promise<ResponseData<object>> => request.post(API.ADD_TASK_URL, task);
export const reqGetTask = (employeeId: number): Promise<ResponseData<GetTaskResponseData>> => request.get(API.GET_TASK_URL + employeeId);
export const reqTaskList = (taskQuery: getTaskQuery): Promise<ResponseData<GetTaskListResponseData>> => request.get(API.ALL_TASK_URL, {
  params: taskQuery
});
export const reqTaskInfo = (taskId: number): Promise<ResponseData<Task>> => request.get(API.TASK_INFO_URL + taskId);
