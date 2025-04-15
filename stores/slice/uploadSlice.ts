import { DEFAULT_UPLOAD_PATH, DEFAULT_UPLOAD_RES, DEFAULT_UPLOAD_TYPE } from "@/settings";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootStateType } from "@/stores";


interface initialType {
  TasksList: TaskList;
  DEFAULT_UPLOAD_RES: typeof DEFAULT_UPLOAD_RES;
  DEFAULT_UPLOAD_PATH: typeof DEFAULT_UPLOAD_PATH;
  DEFAULT_UPLOAD_TYPE: typeof DEFAULT_UPLOAD_TYPE;
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
                picturePath: ""
              },
              {
                penId: 1,
                penNum: -1,
                type: "",
                picturePath: ""
              },
              {
                penId: 2,
                penNum: -1,
                type: "",
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
                picturePath: ""
              },
              {
                penId: 1,
                penNum: -1,
                type: "",
                picturePath: ""
              },
              {
                penId: 2,
                penNum: -1,
                type: "",
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
                picturePath: ""
              },
              {
                penId: 1,
                penNum: -1,
                type: "",
                picturePath: ""
              },
              {
                penId: 2,
                penNum: -1,
                type: "",
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
                picturePath: ""
              },
              {
                penId: 1,
                penNum: -1,
                type: "",
                picturePath: ""
              },
              {
                penId: 2,
                penNum: -1,
                type: "",
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
                picturePath: ""
              },
              {
                penId: 1,
                penNum: -1,
                type: "",
                picturePath: ""
              },
              {
                penId: 2,
                penNum: -1,
                type: "",
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
                picturePath: ""
              },
              {
                penId: 1,
                penNum: -1,
                type: "",
                picturePath: ""
              },
              {
                penId: 2,
                penNum: -1,
                type: "",
                picturePath: ""
              }
            ]
          }
        ]
      }
    ],
    DEFAULT_UPLOAD_PATH,
    DEFAULT_UPLOAD_RES,
    DEFAULT_UPLOAD_TYPE
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
