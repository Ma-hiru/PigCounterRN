import AppSettings from "@/settings";
import request from "@/utils/request";

export const reqGetBuildingsAndPens = (orgId: number): Promise<ReqResponse<CompanyList>> => {
  return request.get(AppSettings.API.Get_Building + orgId);
};
export const reqAddBuilding = (
  buildingName: string,
  orgId: number,
  id?: number
): Promise<ReqResponse<object>> => {
  return request.post(AppSettings.API.Add_Building, { id, buildingName, orgId });
};
export const reqDelBuilding = (id: number): Promise<ReqResponse<object>> => {
  return request.delete(AppSettings.API.Del_Building + id);
};
export const reqEditBuilding = (
  id: number,
  buildingName: string,
  orgId: number
): Promise<ReqResponse<object>> => {
  return request.put(AppSettings.API.Edit_Building, { id, buildingName, orgId });
};
export const reqAddPen = (
  penName: string,
  buildingId: number,
  id?: number,
): Promise<ReqResponse<object>> => {
  return request.post(AppSettings.API.Add_Pen, { id, penName, buildingId });
};
export const reqDelPen = (id: number): Promise<ReqResponse<object>> => {
  return request.delete(AppSettings.API.Del_Pen + id);
};
export const reqEditPen = (
  id: number,
  penName: string,
  buildingId: number
): Promise<ReqResponse<object>> => {
  return request.put(AppSettings.API.Edit_Pen, { id, penName, buildingId });
};
