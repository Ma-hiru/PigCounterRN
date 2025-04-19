//TODO 后端待解决头像路径
import { baseUrl } from "@/settings";


export const handleAvatarURL = (responseURL: string) => {
  return (baseUrl + responseURL).replace("usr/local/", "").replace("profilePicture", "api/image");
};
export const handleUploadURL =
  (responseURL: string) => {
    return (baseUrl + responseURL).replace("jpeg", "jpg").replace("app", "image").replace("https", "http").replace("8080", "80");
  };
