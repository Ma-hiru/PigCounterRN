import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE
} from "redux-persist";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import rootReducer from "@/stores/reducer";

/** 分开配置 以免丢失类型推导 */
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  // whitelist: [],
  // blacklist: [],
  version: 1,
  migrate: (state: any) => Promise.resolve(state)
};
const persistedReducer = persistReducer(persistConfig, combineReducers(rootReducer));

export const RootState = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
});
export const Persistor = persistStore(RootState);

Persistor.subscribe(() => {
  const { bootstrapped } = Persistor.getState();
  if (bootstrapped) {
    console.log("持久化状态已恢复:", RootState.getState());
  }
});
