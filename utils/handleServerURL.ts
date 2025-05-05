import { baseUrl } from "@/settings";

export const handleServerURL = (responseURL: string, mode: "companyLogo" | "upload" | "avatar") => {
  switch (mode) {
    case "companyLogo":
      return baseUrl + "/api/image" + responseURL;
    case "avatar":
      return baseUrl + "/api/profilePicture/" + responseURL;
    case "upload":
      return baseUrl + "/api/image" + responseURL.replace("/app","").replace(".jpeg",".jpg");
  }
};
