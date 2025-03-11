import { configureStore } from "@reduxjs/toolkit";
import { useUserStore } from "./moudule/useUserStore";

const RootState = configureStore({
  reducer: {
    userStore: useUserStore.reducer
  }
});
export default RootState;
export type RootStateType = ReturnType<typeof RootState.getState>
export type AppDispatch = typeof RootState.dispatch;
export * from "./moudule/useUserStore";
