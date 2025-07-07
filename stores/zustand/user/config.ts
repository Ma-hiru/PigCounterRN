export const UserConfig: ZustandConfig<InitialStateType & UserStoreActions, InitialStateType> = (set, get, api) => ({
  ...InitialState,
  setToken(token: string) {
    set(state => {
      state.token = token;
    });
  },
  setUserProfile(userProfile: Partial<UserProfile>) {
    set(state => {
      Object.keys(state.profile).forEach((key) => {
        if (key in userProfile) {
          Reflect.set(state.profile, key, userProfile[key as keyof UserProfile], state.profile);
        }
      });
    });
  },
  setLogin(userProfile: UserProfile) {
    const { setToken, setUserProfile } = get();
    setToken(userProfile.token);
    setUserProfile(userProfile);
  },
  setLogout() {
    set(state => {
      Object.assign(state, InitialState);
    });
  },
  setMemo(memo) {
    set(state => {
      state.memo = memo;
    });
  },
  isLogin() {
    return get().token !== "";
  },
  isMemo() {
    return {
      memo: get().memo,
      isMemo: get().memo.username !== "" && get().memo.password !== ""
    };
  }
});

interface InitialStateType {
  token: string;
  memo: { username: string, password: string };
  profile: Omit<UserProfile, "token">;
}

const InitialState: InitialStateType = {
  token: "",
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
    username: ""
  }
};

export interface UserStoreActions {
  setToken(token: string): void;

  setUserProfile(userProfile: Partial<UserProfile>): void;

  isLogin(): boolean;

  setLogin(userProfile: UserProfile): void;

  setLogout(): void;

  setMemo(memo: { username: string, password: string }): void;

  isMemo(): {
    memo: { username: string, password: string };
    isMemo: boolean;
  };
}
