import { API } from "@/settings";
import { upload } from "@/utils/upload";

export const reqUpload = (data: uploadInfo): Promise<ResponseData<UploadResponseData>> => {
  const formData = new FormData();
  formData.append("penId", String(data.penId));
  formData.append("taskId", String(data.taskId));
  data.files.forEach((file) => {
    formData.append("files", file as Blob);
  });
  return upload(API.UPLOAD_URL, formData);
};
