type Task = {
  id: number;
  taskName?: string;
  employeeId: number;
  startTime: string;
  endTime: string;
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
