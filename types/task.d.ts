type Task = {
  id: number;
  employeeId: number;
  startTime: string;
  endTime: string;
  buildings: Building[]
}
type Building = {
  buildingId: number;
  pens: Pen[];
}
type Pen = {
  penId: number;
  penNum: number;
  picturePath: string;
  type: "" | "videos" | "images";
  peopleNum?: number;
}
type TaskList = Task[];
