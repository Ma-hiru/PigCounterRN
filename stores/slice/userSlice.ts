import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootStateType } from "@/stores";

interface initialType {
  token: string;
}

const userSlice = createSlice({
  name: "userStore",
  initialState: {
    token: ""
  } as initialType,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    }
  }
});
export const userReducer = userSlice.reducer;
export const userSelector = (root: RootStateType) => root.userStore;
export const userActions = userSlice.actions;
