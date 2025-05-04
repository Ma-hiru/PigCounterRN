import { DEFAULT_UPLOAD_PATH, DEFAULT_UPLOAD_RES, DEFAULT_UPLOAD_TYPE } from "@/settings";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootStateType } from "@/stores";

interface initialType {
  TasksList: TaskList;
  OnceTask: TaskList;
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
        taskName: "测试任务一",
        startTime: "2025-05-4 8:00",
        endTime: "2025-05-5 18:00",
        buildings: [
          {
            buildingId: 0,
            buildingName: "",
            pens: [
              {
                penId: 0,
                penName: "",
                count: -1,
                manualCount: -1,
                picturePath: "",
                outputPicturePath: "",
                status: false,
                type: ""
              },
              {
                penId: 1,
                penName: "",
                count: -1,
                manualCount: -1,
                picturePath: "",
                outputPicturePath: "",
                status: false,
                type: ""
              },
              {
                penId: 3,
                penName: "",
                count: -1,
                manualCount: -1,
                picturePath: "",
                outputPicturePath: "",
                status: false,
                type: ""
              }
            ]
          },
          {
            buildingId: 1,
            buildingName: "",
            pens: [
              {
                penId: 0,
                penName: "",
                count: -1,
                manualCount: -1,
                picturePath: "",
                outputPicturePath: "",
                status: false,
                type: ""
              },
              {
                penId: 1,
                penName: "",
                count: -1,
                manualCount: -1,
                picturePath: "",
                outputPicturePath: "",
                status: false,
                type: ""
              },
              {
                penId: 3,
                penName: "",
                count: -1,
                manualCount: -1,
                picturePath: "",
                outputPicturePath: "",
                status: false,
                type: ""
              }
            ]
          },
          {
            buildingId: 2,
            buildingName: "",
            pens: [
              {
                penId: 0,
                penName: "",
                count: -1,
                manualCount: -1,
                picturePath: "",
                outputPicturePath: "",
                status: false,
                type: ""
              },
              {
                penId: 1,
                penName: "",
                count: -1,
                manualCount: -1,
                picturePath: "",
                outputPicturePath: "",
                status: false,
                type: ""
              },
              {
                penId: 3,
                penName: "",
                count: -1,
                manualCount: -1,
                picturePath: "",
                outputPicturePath: "",
                status: false,
                type: ""
              }
            ]
          }
        ]
      },
      {
        id: 1,
        employeeId: 0,
        taskName: "测试任务二",
        startTime: "2025-05-4 8:00",
        endTime: "2025-05-5 18:00",
        buildings: [
          {
            buildingId: 0,
            buildingName: "",
            pens: [
              {
                penId: 0,
                penName: "",
                count: -1,
                manualCount: -1,
                picturePath: "",
                outputPicturePath: "",
                status: false,
                type: ""
              },
              {
                penId: 1,
                penName: "",
                count: -1,
                manualCount: -1,
                picturePath: "",
                outputPicturePath: "",
                status: false,
                type: ""
              },
              {
                penId: 3,
                penName: "",
                count: -1,
                manualCount: -1,
                picturePath: "",
                outputPicturePath: "",
                status: false,
                type: ""
              }
            ]
          },
          {
            buildingId: 1,
            buildingName: "",
            pens: [
              {
                penId: 0,
                penName: "",
                count: -1,
                manualCount: -1,
                picturePath: "",
                outputPicturePath: "",
                status: false,
                type: ""
              },
              {
                penId: 1,
                penName: "",
                count: -1,
                manualCount: -1,
                picturePath: "",
                outputPicturePath: "",
                status: false,
                type: ""
              },
              {
                penId: 3,
                penName: "",
                count: -1,
                manualCount: -1,
                picturePath: "",
                outputPicturePath: "",
                status: false,
                type: ""
              }
            ]
          },
          {
            buildingId: 2,
            buildingName: "",
            pens: [
              {
                penId: 0,
                penName: "",
                count: -1,
                manualCount: -1,
                picturePath: "",
                outputPicturePath: "",
                status: false,
                type: ""
              },
              {
                penId: 1,
                penName: "",
                count: -1,
                manualCount: -1,
                picturePath: "",
                outputPicturePath: "",
                status: false,
                type: ""
              },
              {
                penId: 3,
                penName: "",
                count: -1,
                manualCount: -1,
                picturePath: "",
                outputPicturePath: "",
                status: false,
                type: ""
              }
            ]
          }
        ]
      },
      {
        id: 2,
        employeeId: 0,
        taskName: "测试任务三",
        startTime: "2025-05-4 8:00",
        endTime: "2025-05-5 18:00",
        buildings: [
          {
            buildingId: 0,
            buildingName: "",
            pens: [
              {
                penId: 0,
                penName: "",
                count: -1,
                manualCount: -1,
                picturePath: "",
                outputPicturePath: "",
                status: false,
                type: ""
              },
              {
                penId: 1,
                penName: "",
                count: -1,
                manualCount: -1,
                picturePath: "",
                outputPicturePath: "",
                status: false,
                type: ""
              },
              {
                penId: 3,
                penName: "",
                count: -1,
                manualCount: -1,
                picturePath: "",
                outputPicturePath: "",
                status: false,
                type: ""
              }
            ]
          },
          {
            buildingId: 1,
            buildingName: "",
            pens: [
              {
                penId: 0,
                penName: "",
                count: -1,
                manualCount: -1,
                picturePath: "",
                outputPicturePath: "",
                status: false,
                type: ""
              },
              {
                penId: 1,
                penName: "",
                count: -1,
                manualCount: -1,
                picturePath: "",
                outputPicturePath: "",
                status: false,
                type: ""
              },
              {
                penId: 3,
                penName: "",
                count: -1,
                manualCount: -1,
                picturePath: "",
                outputPicturePath: "",
                status: false,
                type: ""
              }
            ]
          },
          {
            buildingId: 2,
            buildingName: "",
            pens: [
              {
                penId: 0,
                penName: "",
                count: -1,
                manualCount: -1,
                picturePath: "",
                outputPicturePath: "",
                status: false,
                type: ""
              },
              {
                penId: 1,
                penName: "",
                count: -1,
                manualCount: -1,
                picturePath: "",
                outputPicturePath: "",
                status: false,
                type: ""
              },
              {
                penId: 3,
                penName: "",
                count: -1,
                manualCount: -1,
                picturePath: "",
                outputPicturePath: "",
                status: false,
                type: ""
              }
            ]
          }
        ]
      }
    ],
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
    }
  }
});
export const uploadReducer = uploadSlice.reducer;
export const uploadSelector = (root: RootStateType) => root.uploadStore;
export const uploadActions = uploadSlice.actions;
