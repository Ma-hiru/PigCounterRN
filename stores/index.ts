import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { RootState, Persistor } from "./persist";


export default RootState;
export const PersistedRootState = Persistor;

export type RootStateType = ReturnType<typeof RootState.getState>
type AppDispatch = typeof RootState.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector;
export * from "@/stores/slice/userSlice";
export * from "@/stores/slice/uploadSlice";
