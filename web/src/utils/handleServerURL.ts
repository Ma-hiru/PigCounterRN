import AppSettings from "@/settings";

export const handleServerURL = (url: string, mode: "CountUploadImg" | "avatar") => {
  switch (mode) {
    case "CountUploadImg":

      if (url.startsWith("http")) return url;
      if (url.startsWith("/app/picture")) {
        return AppSettings.BASE_URL + "/api/image" + url.replace("/app", "");
      }
      return AppSettings.BASE_URL + "/api/image" + url.replace("/app", "").replace(".jpeg", ".jpg");
    case "avatar":
      if (url.startsWith("http") || url.startsWith("blob")) return url;
      if (url === "") return "";
      return AppSettings.BASE_URL + "/api/profilePicture/" + url;
  }
};
