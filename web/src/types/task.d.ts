type NewTask = {
  taskName: string;
  employeeId: number;
  startTime: string;
  endTime: string;
  buildings: NewBuilding[]
}
type NewBuilding = {
  buildingId: number;
  pens: NewPen[];
}
type NewPen = {
  penId: number;
}
type BaseTask = {
  id: number;
  taskName?: string;
  employeeId: number;
  startTime: string;
  endTime: string;
  valid?: boolean;
}
type Task = BaseTask & {
  buildings: Building[]
}
type Building = {
  buildingId: number;
  buildingName: string;
  pens: Pen[];
}
type Pen = {
  penId: number;
  penName: string;
  count: number;
  manualCount: number;
  picturePath: string;
  outputPicturePath: string;
  status: boolean;
  type?: "" | "videos" | "images";
}
type TaskList = Task[];
