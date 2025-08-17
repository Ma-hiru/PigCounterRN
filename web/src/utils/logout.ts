import RootState, { userActions } from "@/stores/redux";

const { setLogout } = userActions;
const { dispatch } = RootState;
export const logout = () => {
  dispatch(setLogout());
};
