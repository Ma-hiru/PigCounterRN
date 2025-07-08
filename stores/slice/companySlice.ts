import { createSlice } from "@reduxjs/toolkit";
import { RootStateType } from "@/stores";


type initialType = {
  Company: Company
}
const companySlice = createSlice({
  name: "newsStore",
  initialState: {
    Company: {}
  } as initialType,
  reducers: {}
});
// export const companyActions =companySlice.actions;
export const companyReducer = companySlice.reducer;
// export const companySelector = (root: RootStateType) => root.companyStore;
