import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootStateType } from "@/stores";

interface initialType {
  profile: UserProfile;
  token: string;
}

const userSlice = createSlice({
  name: "userStore",
  initialState: {
    token: "",
    profile: {
      id: -1,
      profilePicture: "",
      username: "",
      name: "",
      organization: "",
      token: ""
    }
  } as initialType,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.profile.token = action.payload;
    },
    setProfile: (state, action: PayloadAction<UserProfile>) => {
      state.profile = action.payload;
      if (state.token !== action.payload.token) {
        state.token = action.payload.token;
      }
    },
    setLogin: (state, action: PayloadAction<UserProfile>) => {
      state.profile = action.payload;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.token = "";
      state.profile = {
        id: -1,
        profilePicture: "",
        username: "",
        name: "",
        organization: "",
        token: "",
        admin: false
      };
    }
  }
});
export const userReducer = userSlice.reducer;
export const userSelector = (root: RootStateType) => root.userStore;
export const userActions = userSlice.actions;
