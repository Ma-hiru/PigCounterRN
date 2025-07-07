import { FC } from "react";
import { ToastAndroid, View } from "react-native";
import { Input, InputField } from "@/components/ui/input";
import { AlertCircleIcon } from "@/components/ui/icon";
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText
} from "@/components/ui/form-control";
import { GlobalStyles } from "@/settings";
import Feather from "@expo/vector-icons/Feather";
import { MyState, useMyState } from "@/hooks/useMyState";
import { validatePassword, validatePhone } from "@/utils/validateFields";
import { Button } from "@rneui/themed";
import AppBtn from "./AppBtn";


type props = {
  success: MyState<boolean>;
  code: MyState<string>;
};

const CheckPermission: FC<props> = ({ success, code }) => {
  const checkInfo = useMyState({ phone: "", code: "" });
  const focus = useMyState({
    phoneFocus: false,
    codeFocus: false
  });
  const validate = useMyState({
    phoneInvalid: false,
    codeInvalid: false,
    newPassword: false
  });
  const checkPhone = () => {
    if (!validatePhone(checkInfo.get().phone)) {
      validate.set((draft) => {
        draft.phoneInvalid = true;
      });
      return false;
    } else validate.set((draft) => {
      draft.phoneInvalid = false;
    });
    return true;
  };
  const getCode = () => {
    if (!checkPhone()) return;
    ToastAndroid.showWithGravity("验证码已发送", ToastAndroid.SHORT, ToastAndroid.BOTTOM);
  };
  const submit = () => {
    if (!checkPhone()) return;
    //TODO
    success.set(true);
    code.set(checkInfo.get().code);
  };

  return (
    <>
      {
        !success.get() && <View className="w-full h-auto">
          <FormControl
            isInvalid={validate.get().phoneInvalid}
            size="md"
            style={{ marginBottom: 20, width: "100%", marginTop: 40 }}
          >
            <Input variant="underlined" className="border-solid"
                   style={{ borderColor: focus.get().phoneFocus ? GlobalStyles.FocusBorderColor : GlobalStyles.DefaultBorderColor }}
                   size="lg">
              <InputField
                placeholder="请输入电话"
                returnKeyType="next"
                value={checkInfo.get().phone}
                onChangeText={(text) => checkInfo.set(draft => {
                  if (text.trim().length <= 11)
                    draft.phone = text.trim();
                })}
                onFocus={() => {
                  focus.set(draft => {
                    draft.phoneFocus = true;
                  });
                }}
                onBlur={() => {
                  focus.set(draft => {
                    draft.phoneFocus = false;
                  });
                }}
              />
              <Feather name="tablet" style={{ marginRight: 5 }} size={16} />
            </Input>
            <FormControlError>
              <FormControlErrorIcon as={AlertCircleIcon} />
              <FormControlErrorText>{"电话号码格式不正确"}</FormControlErrorText>
            </FormControlError>
          </FormControl>
          <FormControl
            isInvalid={validate.get().codeInvalid}
            size="md"
            style={{ marginBottom: 20, width: "100%" }}
          >
            <View className="flex-row justify-between w-full items-center">
              <View className="flex-1" style={{ paddingRight: 20 }}>
                <Input variant="underlined" className="border-solid"
                       style={{ borderColor: focus.get().codeFocus ? GlobalStyles.FocusBorderColor : GlobalStyles.DefaultBorderColor }}
                       size="lg"
                >
                  <InputField
                    placeholder="请输入验证码"
                    returnKeyType="done"
                    value={checkInfo.get().code}
                    onChangeText={(text) => checkInfo.set(draft => {
                      if (text.trim().length <= 6)
                        draft.code = text.trim();
                      else ToastAndroid.showWithGravity("验证码不能超过6位", ToastAndroid.SHORT, ToastAndroid.BOTTOM);
                    })}
                    onFocus={() => {
                      focus.set(draft => {
                        draft.codeFocus = true;
                      });
                    }}
                    onBlur={() => {
                      focus.set(draft => {
                        draft.codeFocus = false;
                      });
                    }}
                  />
                </Input>
              </View>
              <View style={{ borderRadius: 5, overflow: "hidden" }}>
                <Button color={GlobalStyles.ThemeColor} onPress={getCode}>
                  获取验证码
                </Button>
              </View>
            </View>
            <FormControlError>
              <FormControlErrorIcon as={AlertCircleIcon} />
              <FormControlErrorText>{"验证码错误"}</FormControlErrorText>
            </FormControlError>
          </FormControl>
          <AppBtn containerStyle={{ marginTop: 15 }}> 提交</AppBtn>
        </View>
      }
    </>
  );
};
export default CheckPermission;
