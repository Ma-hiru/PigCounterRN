import { FC } from "react";
import { Log } from "@/utils/logger";


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

  declare class RNFile {
    public readonly uri: string;
    public readonly name: string;
    public readonly type: string;
    public InitialExist: boolean;

    constructor(uri?: string, name?: string, type?: string): void

    toString(): string

    async IsExistAsync(): Promise<boolean>

    async DeleteAsync(): Promise<boolean>

    DeleteSync(): void
  }

  type Fonts =
    | "FlyFlowerSongRegular"
    | "baigetianxingtiRegular"

}
