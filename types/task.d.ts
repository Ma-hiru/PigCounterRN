export type Area = {
  id: number;
  name: string;
} & (
  | { path: string; res: number; }
  | { children: Area[]; }
  )
export type AreaItem = Area & { children: AreaChild[] }
export type AreaChild = Area & { path: string; res: number; }
export type Task = {
  id: number,
  time: string,
  validation: boolean,
  area: Area[]
}
export type TaskList = Task[]
