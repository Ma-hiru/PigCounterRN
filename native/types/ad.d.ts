import { ImageSource } from "expo-image";

type AD = {
  cover: ImageSource | number;
  url: string;
  title: string;
  handler(): void;
}

interface CarouselData {
  cover: ImageSource | number,
  title: string,
  url: string,

  handler(): void
}
