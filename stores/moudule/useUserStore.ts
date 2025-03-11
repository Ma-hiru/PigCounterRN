import { createSlice } from "@reduxjs/toolkit";
import localStore from "@/utils/localStore";


export const useUserStore = createSlice({
  name: "userStore",
  initialState: {
    token: ""
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      localStore.setItem("token", action.payload).then();
    }
  }
});
