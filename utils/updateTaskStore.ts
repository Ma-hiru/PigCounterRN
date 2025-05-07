import RootState, { uploadActions } from "@/stores";
import { cloneDeep } from "lodash-es";

export type TaskIndexTuple = {
  TaskIndex: number;
  BuildingIndex: number;
  PenIndex: number;
}
const { setTasksList, setOnceTask } = uploadActions;
const dispatch = RootState.dispatch;
export const updateTaskList = (TaskIndexTuple: TaskIndexTuple, newPath?: Pen["picturePath"], newType?: Pen["type"], newRes?: Pen["count"], newPeopleNum?: Pen["manualCount"], Once?: boolean) => {
  let newTaskList;
  if (Once) newTaskList = cloneDeep(RootState.getState().uploadStore?.OnceTask);
  else newTaskList = cloneDeep(RootState.getState().uploadStore?.TasksList);
  const pen = newTaskList[TaskIndexTuple.TaskIndex].buildings[TaskIndexTuple.BuildingIndex].pens[TaskIndexTuple.PenIndex];
  newPath !== undefined && (pen.picturePath = newPath);
  newRes && (pen.count = newRes);
  newPeopleNum && (pen.manualCount = newPeopleNum);
  newType !== undefined && (pen.type = newType);
  if (Once) dispatch(setOnceTask(newTaskList));
  else dispatch(setTasksList(newTaskList));
};
export const updateTaskListStatus = (TaskIndexTuple: TaskIndexTuple, Status?: boolean) => {
  const newTaskList = cloneDeep(RootState.getState().uploadStore?.TasksList);
  if (Status !== undefined) {
    newTaskList[TaskIndexTuple.TaskIndex].buildings[TaskIndexTuple.BuildingIndex].pens[TaskIndexTuple.PenIndex].status = Status;
  }
  dispatch(setTasksList(newTaskList));
};
