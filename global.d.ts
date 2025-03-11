import { FC } from "react";

type getProps<T> = T extends FC<infer P> ? P : never;
