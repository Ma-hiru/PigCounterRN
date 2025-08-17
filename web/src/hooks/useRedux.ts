import { Ref, ref, watch } from "vue";
import RootState, { RootStateType, userActions } from "@/stores/redux";

const state = ref<RootStateType["userStore"]>(RootState.getState().userStore);
const { setStore } = userActions;
RootState.subscribe(() => {
  if (state.value !== RootState.getState().userStore) {
    state.value = RootState.getState().userStore;
  }
});
watch(state, () => {
  if (state.value !== RootState.getState().userStore) {
    RootState.dispatch(setStore(state.value));
  }
});
export const useUserRedux = (): Ref<RootStateType["userStore"]> => {
  return state;
};
