import request from "@/utils/request";
import type {
  loginInfo,
  LoginResponseData,
  ResponseData
} from "@/types/api";
import { API } from "@/settings";


export const reqLogin = (data: loginInfo): Promise<ResponseData<LoginResponseData>> => request.post(API.LOGIN_URL, data);

