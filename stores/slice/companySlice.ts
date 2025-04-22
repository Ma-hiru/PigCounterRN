import { createSlice } from "@reduxjs/toolkit";
import { RootStateType } from "@/stores";


type initialType = {
  Company: CompanyProfile
}
const newsSlice = createSlice({
  name: "newsStore",
  initialState: {
    Company: {}
  } as initialType,
  reducers: {}
});
export const newsActions = newsSlice.actions;
export const newsReducer = newsSlice.reducer;
export const newsSelector = (root: RootStateType) => root.newsStore;
