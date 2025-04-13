import { uploadInfo, ResponseData, UploadResponseData } from "@/types/api";
import request from "@/utils/request";
import { API } from "@/settings";

export const reqUpload = (data: uploadInfo): Promise<ResponseData<UploadResponseData>> => request.post(API.UPLOAD_URL, data);
