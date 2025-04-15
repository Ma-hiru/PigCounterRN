import request from "@/utils/request";
import { API } from "@/settings";


export const reqLogin = (data: loginInfo): Promise<ResponseData<LoginResponseData>> => request.post(API.LOGIN_URL, data);
export const reqRegistry = (data: registryInfo): Promise<ResponseData<object>> => {
  const formData = new FormData();
  for (const key in data) {
    if ((key as keyof registryInfo) !== "picture") {
      formData.append(key, String(data[key as keyof Omit<registryInfo, "picture">]));
    }
  }
  formData.append("picture", data.picture as Blob);
  return request.post(API.REGISTRY_URL, formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
};
export const reqLogout = (): Promise<ResponseData<object>> => request.post(API.LOGOUT_URL);
export const reqUserInfo = (id: number): Promise<UserInfo> => request.get(API.USER_INFO_URL + id);
export const reqUpdateUser = (info: UserInfo & registryInfo["picture"]): Promise<ResponseData<object>> => request.put(API.UPDATE_USER_URL, info);
export const reqDeleteUser = (id: number): Promise<ResponseData<object>> => request.delete(API.USER_INFO_URL + id);
export const reqAllEmployees = (query: getEmployeeQuery): Promise<ResponseData<GetEmployeeListResponseData>> => request.get(API.ALL_EMPLOYEE_URL, {
  params: query
});
