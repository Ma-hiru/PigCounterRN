import request from "@/utils/request";
import { API } from "@/settings";

export const reqAddBuilding = (info: addBuildingInfo): Promise<ResponseData<object>> => request.post(API.ADD_BUILDING, info);
export const reqDeleteBuilding = (buildingId: number): Promise<ResponseData<object>> => request.delete(API.DELETE_BUILDING + buildingId);
