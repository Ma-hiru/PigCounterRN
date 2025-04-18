import { ImageSource } from "expo-image";

type AD = {
  cover: ImageSource | number;
  url: string;
  title: string;
  handler?: (ad: AD) => void;
}
