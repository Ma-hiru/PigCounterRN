import { registryInfo } from "@/types/api.d";
import { curryFirst } from "@/utils/curryFirst";
import { Updater } from "use-immer";

type Fn_R<R> = () => R
type Fn_PR<P, R> = (arg: P) => R
type rulesType =
  Record<keyof validateType, Fn_PR<registryInfo, boolean> | boolean>
  & {
    [Symbol.iterator]: Fn_R<{
      next: Fn_R<{
        value: [string, boolean],
        done: boolean
      }>
    }>
  };
/** @desc 注册表单验证规则 */
const rulesGenerate = (registryInfo: registryInfo) => {
  return {
    username: registryInfo.username.trim().length >= 4,
    password: validatePassword,
    name: registryInfo.name.trim().length >= 2,
    phone: validatePhone,
    sex: registryInfo.sex === "male" || registryInfo.sex === "female",
    organization: registryInfo.organization !== "",
    [Symbol.iterator]() {
      const entries: [string, ((registryInfo: registryInfo) => boolean) | boolean][] = Object.entries(this);
      let index = 0;
      return {
        next() {
          if (index < entries.length) {
            const [key, value] = entries[index++];
            if (typeof value === "boolean")
              return { value: [key, value], done: false };
            else
              return { value: [key, value(registryInfo)], done: false };
          }
          return { done: true, value: undefined };
        }
      };
    }
  } as rulesType;
};
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
/** @desc 注册表单验证字段 */
export type validateType = Omit<Record<keyof registryInfo, boolean>, "id">;
/** @desc 注册表单验证函数 */
export const validate = (registryInfo: registryInfo, setInvalid: Updater<validateType>) => {
  let valid = true;
  const newSetValidate = curryFirst(setValidate, setInvalid);
  const rules = rulesGenerate(registryInfo);
  for (const map of rules)
    !newSetValidate(map[1], map[0] as keyof validateType) && (valid = false);
  return valid;
};

const setValidate = (setInvalid: Updater<validateType>, res: boolean, key: keyof validateType) => {
  setInvalid(draft => {
    draft[key] = !res;
  });
  return res;
};
