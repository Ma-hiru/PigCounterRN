import AppSettings from "@/settings";
import request from "@/utils/request";

export const reqLogin = (LoginParams: LoginParams): Promise<ReqResponse<LoginResponseData>> => {
  return request.post(AppSettings.API.Login, LoginParams);
};
