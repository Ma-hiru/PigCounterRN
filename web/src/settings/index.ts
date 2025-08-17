import * as API from "@/settings/settings.api";
import * as THEME from "@/settings/settings.theme";
import * as APP from "@/settings/settings.app";

const AppSettings = {
  ...APP,
  ...THEME,
  ...API
};
export default AppSettings;
