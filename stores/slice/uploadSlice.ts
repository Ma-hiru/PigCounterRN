import { DEFAULT_UPLOAD_PATH, DEFAULT_UPLOAD_RES, DEFAULT_UPLOAD_TYPE } from "@/settings";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootStateType } from "@/stores";

interface initialType {
  TasksList: TaskList;
  AllTaskList: BaseTask[];
  OnceTask: TaskList;
  readonly DEFAULT_UPLOAD_RES: typeof DEFAULT_UPLOAD_RES;
  readonly DEFAULT_UPLOAD_PATH: typeof DEFAULT_UPLOAD_PATH;
  readonly DEFAULT_UPLOAD_TYPE: typeof DEFAULT_UPLOAD_TYPE;
}

const uploadSlice = createSlice({
  name: "uploadStore",
  initialState: {
    TasksList: [],
    AllTaskList: [],
    OnceTask: [{
      id: -1,
      employeeId: -1,
      taskName: "",
      startTime: "2025-05-4 8:00",
      endTime: "2025-05-5 18:00",
      buildings: [{
        buildingId: 0,
        buildingName: "",
        pens: [{
          penId: 0,
          penName: "",
          count: -1,
          manualCount: -1,
          picturePath: "",
          outputPicturePath: "",
          status: false,
          type: ""
        }]
      }]
    }],
    DEFAULT_UPLOAD_PATH,
    DEFAULT_UPLOAD_RES,
    DEFAULT_UPLOAD_TYPE
  } as initialType,
  reducers: {
    setTasksList: (state, action: PayloadAction<TaskList>) => {
      state.TasksList = action.payload;
    },
    setOnceTask: (state, action: PayloadAction<TaskList>) => {
      state.OnceTask = action.payload;
    },
    setAllTaskList: (state, action: PayloadAction<BaseTask[]>) => {
      state.AllTaskList = action.payload;
    }
  }
});
export const uploadReducer = uploadSlice.reducer;
// export const uploadSelector = (root: RootStateType) => root.uploadStore;
// export const uploadActions = uploadSlice.actions;
