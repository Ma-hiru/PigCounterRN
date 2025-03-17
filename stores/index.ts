import { configureStore } from "@reduxjs/toolkit";
import { useUserStore } from "./moudule/useUserStore";
import { useUploadStore } from "./moudule/useUploadStore";

const RootState = configureStore({
  reducer: {
    userStore: useUserStore.reducer,
    uploadStore: useUploadStore.reducer
  }
});
export default RootState;
export type RootStateType = ReturnType<typeof RootState.getState>
export type AppDispatch = typeof RootState.dispatch;
export * from "./moudule/useUserStore";
export * from "./moudule/useUploadStore";
