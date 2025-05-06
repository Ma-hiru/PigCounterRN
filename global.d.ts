import { FC } from "react";


declare global {
  type GetReactProps<T> = T extends FC<infer P> ? P : never;
  declare module "*.png" {
    export default {
      uri: string,
      width: number,
      height: number
    } | number;
  }
  declare module "*.jpg" {
    export default {
      uri: string,
      width: number,
      height: number
    } | number;
  }
  declare module "*.jpeg" {
    export default {
      uri: string,
      width: number,
      height: number
    } | number;
  }
  declare module "*.webp" {
    export default {
      uri: string,
      width: number,
      height: number
    } | number;
  }
  declare module "*.svg" {
    export default {
      uri: string,
      width: number,
      height: number
    } | number;
  }
  declare module "*.ttf" {
    export default any;
  }

  interface RNFile {
    uri: string;
    name: string;
    type: string;
  }

  type Fonts =
    | "FlyFlowerSongRegular"
    | "baigetianxingtiRegular"

}
