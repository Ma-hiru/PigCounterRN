import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootStateType } from "@/stores/redux";


interface UserStore {
  token: string;
  userProfile: UserProfile;
}

const userSlice = createSlice({
  name: "userStore",
  initialState: {
    token: "",
    userProfile: {
      id: 0,
      username: "test",
      name: "",
      token: "",
      admin: false,
      profilePicture: "",
      organization: ""
    }
  } as UserStore,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.userProfile.token = action.payload;
    },
    setUserProfile: (state, action: PayloadAction<UserProfile>) => {
      state.userProfile = action.payload;
      if (state.token !== action.payload.token) {
        state.token = action.payload.token;
      }
    },
    setLogin: (state, action: PayloadAction<UserProfile>) => {
      state.userProfile = action.payload;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.token = "";
      state.userProfile = {
        id: 0,
        username: "test",
        name: "",
        token: "",
        admin: false,
        profilePicture: "",
        organization: ""
      };
    },
    setStore: (state, action: PayloadAction<UserStore>) => {
      state.token = action.payload.token;
      state.userProfile = action.payload.userProfile;
    }
  }
});

export const userActions = userSlice.actions;
export const userReducer = userSlice.reducer;
export const userSelector = (root: RootStateType) => root.userStore;
