import { StyleSheet } from "react-native";

export const GlobalStyles = {
  ...StyleSheet.create({}),
  WeatherIcon: {
    style: "fill",
    color: "white",
    defaultIcon: 100
  },
  BlurBgCardColor: "#dffffd",
  ThemeColor: "#2b5876",
  ThemeColorOld: "#409eff",
  SecondColor: "#F8F800F9",
  SecondColor2: "#f4c743",
  PressColorBlue: "#1280f2",
  PositiveColor: "rgb(52,131,82)",
  NegativeColor: "#ffffff",
  ErrorColor: "rgb(230,53,53)",
  TabBarBg: "#ffffff",
  HeaderBg: "#ffffff",
  HeaderText: "#000000",
  TagsText: "#ffffff",
  UploadCardBg: "#ffffff",
  UploadCardColor: "#000000",
  ThemeColor1: "#5c92c1",
  ThemeColor2: "#dcecfb",
  ThemeColor3: "#99b8d5",
  ThemeColor4: "#bad0e8",
  ThemeColor5: "rgba(64,158,255,0.93)",
  DisabledColor: "#c8c8c8",
  FocusBorderColor: "rgba(255,255,255,0.8)",
  DefaultBorderColor: "#666666"
} as const;
