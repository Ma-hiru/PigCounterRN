import request from "@/utils/request";
import { API } from "@/settings";
import { upload } from "@/utils/upload";


export const reqLogin = (data: loginInfo): Promise<ResponseData<LoginResponseData>> => request.post(API.LOGIN_URL, data);
export const reqRegistry = async (data: registryInfo): Promise<ResponseData<object>> => {
  const formData = new FormData();
  for (const key in data) {
    if (key !== "picture" && typeof data[key as keyof registryInfo] !== "object") {
      if (data[key as keyof registryInfo])
        formData.append(key, String(data[key as keyof registryInfo]));
    }
  }
  formData.append("picture", data.picture as Blob, (data.picture as RNFile).name || "avatar.jpg");
  if(data.admin) formData.append("admin", "true");
  else formData.append("admin", "false");
  return upload(API.REGISTRY_URL,formData);
};
export const reqLogout = (): Promise<ResponseData<object>> => request.post(API.LOGOUT_URL);
export const reqUserInfo = (id: number): Promise<ResponseData<UserInfo>> => request.get(API.USER_INFO_URL + id);
export const reqUpdateUser = (info: UserInfo & registryInfo["picture"]): Promise<ResponseData<object>> => request.put(API.UPDATE_USER_URL, info);
export const reqDeleteUser = (id: number): Promise<ResponseData<object>> => request.delete(API.USER_INFO_URL + id);
export const reqAllEmployees = (query: getEmployeeQuery): Promise<ResponseData<GetEmployeeListResponseData>> => request.get(API.ALL_EMPLOYEE_URL, {
  params: query
});
