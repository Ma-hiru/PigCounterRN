import { Updater } from "use-immer";

const rulesGenerate = (loginInfo: loginInfo) => ({
  username: {
    validate: loginInfo.username.trim().length >= 4,
    text: "用户名至少需要四位字符"
  },
  password: {
    validate: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(loginInfo.password.trim()),
    text: "密码至少八位，且有一个大小写字母和数字"
  }
});

export const validate = (loginInfo: loginInfo, setValidate: Updater<{
  username: boolean
  password: boolean
}>) => {
  let validateRes = true;
  const rules = rulesGenerate(loginInfo);
  if (rules.password.validate) {
    setValidate((draft) => {
      draft.username = false;
    });
  } else {
    setValidate((draft) => {
      draft.username = true;
    });
    validateRes = false;
  }
  if (rules.username.validate) {
    setValidate((draft) => {
      draft.password = false;
    });
  } else {
    setValidate((draft) => {
      draft.password = true;
    });
    validateRes = false;
  }
  return validateRes;
};
export const validateRules = rulesGenerate;
