import { registryInfo } from "@/types/api.d";
import { curryFirst } from "@/utils/curryFirst";
import { Updater } from "use-immer";

/** 相关类型 */
type Fn_R<R> = () => R;
type Fn_PR<P, R> = (arg: P) => R;
type rulesType = Record<
  validateField,
  {
    validate: Fn_PR<registryInfo, boolean> | boolean;
    text: string;
  }
>;
type rulesGeneratorType = rulesType & {
  [Symbol.iterator]: Fn_R<{
    next: Fn_R<{
      value: [string, { validate: boolean; text: string }];
      done: boolean;
    }>;
  }>;
};
/** @desc 注册表单验证字段 */
export type validateType = Omit<Record<keyof registryInfo, boolean>, "id">;

export type validateField = keyof validateType;
/** @desc 注册表单验证规则 */
const rules = (registryInfo: registryInfo) =>
  ({
    username: {
      validate: registryInfo.username.trim().length >= 4,
      text: "用户名至少需要四位字符",
    },
    password: {
      validate: validatePassword,
      text: "密码至少八位，且有一个大小写字母和数字",
    },
    name: {
      validate: registryInfo.name.trim().length >= 2,
      text: "姓名至少需要两位字符",
    },
    phone: {
      validate: validatePhone,
      text: "电话号码格式不正确",
    },
    sex: {
      validate: registryInfo.sex === "male" || registryInfo.sex === "female",
      text: "性别不能为空",
    },
    organization: {
      validate: registryInfo.organization !== "",
      text: "组织不能为空",
    },
  } as rulesType);
const validatePhone = (registryInfo: registryInfo) => {
  const phone = registryInfo.phone!.trim();
  const phoneRegex = /^1[3-9]\d{9}$/;
  return phoneRegex.test(phone);
};
const validatePassword = (registryInfo: registryInfo) => {
  const password = registryInfo.password.trim();
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  return passwordRegex.test(password);
};
const rulesGenerate = (registryInfo: registryInfo) =>
  ({
    ...rules(registryInfo),
    [Symbol.iterator]() {
      const entries: [
        string,
        {
          validate: Fn_PR<registryInfo, boolean> | boolean;
          text: string;
        }
      ][] = Object.entries(this);
      let index = 0;
      return {
        next() {
          if (index < entries.length) {
            const [key, value] = entries[index++];
            if (typeof value.validate === "boolean") return { value: [key, value], done: false };
            else {
              value.validate = value.validate(registryInfo);
              return { value: [key, value], done: false };
            }
          }
          return { done: true, value: undefined };
        },
      };
    },
  } as rulesGeneratorType);
/** @desc 注册表单验证函数 */
export const validate = (registryInfo: registryInfo, setInvalid: Updater<validateType>) => {
  let valid = true;
  const newSetValidate = curryFirst(setValidate, setInvalid);
  const rules = rulesGenerate(registryInfo);
  for (const map of rules) {
    !newSetValidate(map[1].validate, map[0] as keyof validateType) && (valid = false);
  }
  return valid;
};
export const validateRules = (registryInfo: registryInfo) => {
  const rules = rulesGenerate(registryInfo);
  const text = new Map<validateField, string>();
  for (const map of rules) {
    text.set(map[0] as validateField, map[1].text);
  }
  return text as Map<validateField, string>;
};
const setValidate = (setInvalid: Updater<validateType>, res: boolean, key: keyof validateType) => {
  setInvalid((draft) => {
    draft[key] = !res;
  });
  return res;
};
