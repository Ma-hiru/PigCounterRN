import { ImageSource } from "expo-image";

type News = {
  title: string;
  cover: ImageSource | number;
  id: string | number;
  content: string;
  time: string;
}
type NewsList = News[];
