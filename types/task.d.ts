export type Area = {
  id: number;
  name: string;
} & (
  | { path: string; res: number; type: string; }
  | { children: Area[]; }
  )
export type AreaItem = Area & { children: AreaChild[] }
export type AreaChild = Area & { path: string; res: number; type: "images" | "videos" | ""; }
export type Task = {
  id: number,
  startTime: string,
  endTime: string,
  validation: boolean,
  area: Area[]
}
export type TaskList = Task[]
