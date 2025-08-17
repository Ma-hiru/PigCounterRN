import AppSettings from "@/settings";
import request from "@/utils/request";

export const reqGetTask = (pageNum: number, pageSize: number, orgId: number): Promise<PageResponse<BaseTask>> => {
  return request.get(AppSettings.API.Get_Task, {
    params: {
      pageNum,
      pageSize,
      orgId
    }
  });
};
export const reqGetTaskDetail = (id: number): Promise<ReqResponse<Task>> => {
  return request.get(AppSettings.API.Get_Task_Detail + id);
};
export const reqAddTask = (task: NewTask & { orgId: number }): Promise<ReqResponse<object>> => {
  return request.post(AppSettings.API.Add_Task, task);
};
