import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { RootState, Persistor } from "./persist";

/** @deprecated */
export default RootState;

/** @deprecated */
export const PersistedRootState = Persistor;

/** @deprecated */
export type RootStateType = ReturnType<typeof RootState.getState>

type AppDispatch = typeof RootState.dispatch;
/** @deprecated */
export const useAppDispatch: () => AppDispatch = useDispatch;

/** @deprecated */
export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector;

