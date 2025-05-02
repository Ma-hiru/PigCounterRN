import RootState, { userActions } from "@/stores";

const { setLogout } = userActions;
const { dispatch } = RootState;
export const logout = () => {
  dispatch(setLogout());
};
