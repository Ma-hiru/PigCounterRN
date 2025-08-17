export const UserConfig: ZustandConfig<InitialStateType & UserStoreActions, InitialStateType> = (set, get) => ({
  ...InitialState,
  setToken(token: string) {
    set(state => {
      state.token = token;
      state.isLogin = token !== "";
    });
  },
  setUserProfile(userProfile: Partial<UserProfile>) {
    set(state => {
      state.profile = { ...state.profile, ...userProfile };
    });
  },
  setLogin(userProfile: UserProfile) {
    const { setToken, setUserProfile } = get();
    setToken(userProfile.token);
    setUserProfile(userProfile);
  },
  setLogout() {
    const { memo } = get();
    set((draft) => ({ ...draft, ...InitialState, memo }));
  },
  setMemo(memo) {
    set(state => {
      state.memo = memo;
    });
  },
  isMemo() {
    const { memo } = get();
    return {
      memo,
      isMemo: memo.username !== "" && memo.password !== ""
    };
  }
});

const InitialState: InitialStateType = {
  token: "",
  isLogin: false,
  memo: {
    username: "",
    password: ""
  },
  profile: {
    admin: false,
    id: 0,
    name: "",
    organization: "",
    profilePicture: "",
    username: "",
    token: ""
  }
};

interface InitialStateType {
  token: string;
  isLogin: boolean;
  memo: { username: string, password: string };
  profile: UserProfile;
}

interface UserStoreActions {
  setToken(token: string): void;

  setUserProfile(userProfile: Partial<UserProfile>): void;

  setLogin(userProfile: UserProfile): void;

  setLogout(): void;

  setMemo(memo: InitialStateType["memo"]): void;

  isMemo(): { memo: InitialStateType["memo"], isMemo: boolean };
}
