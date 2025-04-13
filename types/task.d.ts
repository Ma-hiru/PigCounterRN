import { DEFAULT_UPLOAD_TYPE } from "@/settings";

export type Task = {
  id: number;
  employeeId: number;
  startTime: string;
  endTime: string;
  buildings: Building[]
}
export type Building = {
  buildingId: number;
  pens: Pen[];
}
export type Pen = {
  penId: number;
  penNum: number;
  picturePath: string;
  type: typeof DEFAULT_UPLOAD_TYPE | "videos" | "images";
}
export type TaskList = Task[];
