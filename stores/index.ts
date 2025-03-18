import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import RootState, { Persistor } from "./persist";


export default RootState;
export const PersistedRootState = Persistor;

type RootStateType = ReturnType<typeof RootState.getState>
type AppDispatch = typeof RootState.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector;
export * from "./moudule/useUserStore";
export * from "./moudule/useUploadStore";
