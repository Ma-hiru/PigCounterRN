import request from "@/utils/request";
import {
  loginInfo,
  LoginResponseData, registryInfo, RegistryResponseData,
  ResponseData
} from "@/types/api";
import { API } from "@/settings";


export const reqLogin = (data: loginInfo): Promise<ResponseData<LoginResponseData>> => request.post(API.LOGIN_URL, data);
export const reqRegistry = (data: registryInfo):Promise<ResponseData<RegistryResponseData>> => request.post(API.REGISTRY_URL, data, {
  headers: {
    "Content-Type": "multipart/form-data"
  }
});
