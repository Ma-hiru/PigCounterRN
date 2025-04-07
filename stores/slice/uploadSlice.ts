import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TaskList } from "@/types/task";
import { RootStateType } from "@/stores";


interface initialType {
  TasksList: TaskList;
  DEFAULT_UPLOAD_RES: number;
  DEFAULT_UPLOAD_PATH: string;
  DEFAULT_UPLOAD_TYPE: "";
}

const uploadSlice = createSlice({
  name: "uploadStore",
  initialState: {
    TasksList: [
      {
        id: 0,
        employeeId: 0,
        startTime: "2025-04-17 8:00",
        endTime: "2025-04-17 12:00",
        buildings: [
          {
            buildingId: 0,
            pens: [
              {
                penId: 0,
                penNum: -1,
                type: "",
                path: "",
                picturePath: ""
              },
              {
                penId: 1,
                penNum: -1,
                type: "",
                path: "",
                picturePath: ""
              },
              {
                penId: 2,
                penNum: -1,
                type: "",
                path: "",
                picturePath: ""
              }
            ]
          },
          {
            buildingId: 1,
            pens: [
              {
                penId: 0,
                penNum: -1,
                type: "",
                path: "",
                picturePath: ""
              },
              {
                penId: 1,
                penNum: -1,
                type: "",
                path: "",
                picturePath: ""
              },
              {
                penId: 2,
                penNum: -1,
                type: "",
                path: "",
                picturePath: ""
              }
            ]
          },
          {
            buildingId: 2,
            pens: [
              {
                penId: 0,
                penNum: -1,
                type: "",
                path: "",
                picturePath: ""
              },
              {
                penId: 1,
                penNum: -1,
                type: "",
                path: "",
                picturePath: ""
              },
              {
                penId: 2,
                penNum: -1,
                type: "",
                path: "",
                picturePath: ""
              }
            ]
          }
        ]
      },
      {
        id: 1,
        employeeId: 0,
        startTime: "2025-04-17 14:00",
        endTime: "2025-04-17 18:00",
        buildings: [
          {
            buildingId: 3,
            pens: [
              {
                penId: 0,
                penNum: -1,
                type: "",
                path: "",
                picturePath: ""
              },
              {
                penId: 1,
                penNum: -1,
                type: "",
                path: "",
                picturePath: ""
              },
              {
                penId: 2,
                penNum: -1,
                type: "",
                path: "",
                picturePath: ""
              }
            ]
          },
          {
            buildingId: 4,
            pens: [
              {
                penId: 0,
                penNum: -1,
                type: "",
                path: "",
                picturePath: ""
              },
              {
                penId: 1,
                penNum: -1,
                type: "",
                path: "",
                picturePath: ""
              },
              {
                penId: 2,
                penNum: -1,
                type: "",
                path: "",
                picturePath: ""
              }
            ]
          },
          {
            buildingId: 5,
            pens: [
              {
                penId: 0,
                penNum: -1,
                type: "",
                path: "",
                picturePath: ""
              },
              {
                penId: 1,
                penNum: -1,
                type: "",
                path: "",
                picturePath: ""
              },
              {
                penId: 2,
                penNum: -1,
                type: "",
                path: "",
                picturePath: ""
              }
            ]
          }
        ]
      }
    ],
    DEFAULT_UPLOAD_RES: -1,
    DEFAULT_UPLOAD_PATH: "",
    DEFAULT_UPLOAD_TYPE: ""
  } as initialType,
  reducers: {
    setTasksList: (state, action: PayloadAction<TaskList>) => {
      state.TasksList = action.payload;
    }
  }
});
export const uploadReducer = uploadSlice.reducer;
export const uploadSelector = (root: RootStateType) => root.uploadStore;
export const uploadActions = uploadSlice.actions;
