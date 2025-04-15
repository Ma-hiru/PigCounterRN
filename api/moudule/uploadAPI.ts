import request from "@/utils/request";
import { API } from "@/settings";

export const reqUpload = (data: uploadInfo): Promise<ResponseData<UploadResponseData>> => {
  const formData = new FormData();
  formData.append("penId", String(data.penId));
  data.files.forEach((file) => {
    formData.append("files", file as Blob);
  });
  return request.post(API.UPLOAD_URL, formData);
};
