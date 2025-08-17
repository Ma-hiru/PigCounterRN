import AppSettings from "@/settings";
import request from "@/utils/request";

export const reqGetEmployee = (pageNum: number, pageSize: number, organization: number): Promise<PageResponse<EmployeeInfo>> => {
  return request.get(AppSettings.API.Get_Employee, {
    params: {
      pageNum,
      pageSize,
      organization
    }
  });
};
export const reqDelEmployee = (id: number): Promise<ReqResponse<object>> => {
  return request.delete(AppSettings.API.Del_Employee + id);
};
export const reqAddEmployee = (employee: NewEmployee): Promise<ReqResponse<object>> => {
  return request.post(AppSettings.API.Add_Employee, employee, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
};
export const reqEditEmployee = (employee: Omit<NewEmployee, "password">): Promise<ReqResponse<object>> => {
  return request.put(AppSettings.API.Edit_Employee, employee, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
};
export const reqSearchEmployee = (employee: Partial<EmployeeInfo>): Promise<PageResponse<EmployeeInfo>> => {
  return request.post(AppSettings.API.Search_Employee, employee);
};
