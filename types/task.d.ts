type Pen = {
  penId: number;
  penNum: number;
  picturePath: string;
  path: string;
  res: number;
  type: "" | "videos" | "images";
}
type Building = {
  buildingId: number;
  pens: Pen[];
}
export type Task = {
  id: number;
  employeeId: number;
  startTime: string;
  endTime: string;
  buildings: Building[]
}
export type TaskList = Task[]
