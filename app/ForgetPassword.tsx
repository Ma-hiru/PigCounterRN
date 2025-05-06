import BigHeader from "@/components/BigHeader";
import { FC } from "react";
import { ScrollView, StatusBar, View } from "react-native";
import { APP_NAME, GlobalStyles } from "@/settings";
import CheckPermission from "@/components/CheckPermission";
import Feather from "@expo/vector-icons/Feather";
import { Button } from "@rneui/themed";
import { useMyState } from "@/hooks/useMyState";
import { validatePassword } from "@/utils/validateFields";
import { Input, InputField } from "@/components/ui/input";
import { AlertCircleIcon } from "@/components/ui/icon";
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText
} from "@/components/ui/form-control";
import { useGetRouteParam } from "@/hooks/useGetRouteParam";
import { LinearGradient } from "expo-linear-gradient";

type props = object
type routeParam = {
  HasBg?: string;
}
const ForgetPassword: FC<props> = () => {
  const success = useMyState(false);
  const password = useMyState("");
  const validate = useMyState(false);
  const focus = useMyState(false);
  const code = useMyState("");
  const HasBG = useGetRouteParam<routeParam, boolean>((params) => {
    if ("HasBg" in params) {
      if (params.HasBg === "false") return false;
    }
    return true;
  });
  const checkPassword = () => {
    if (validatePassword(password.get())) {
      validate.set(false);
      return true;
    } else {
      validate.set(true);
    }
    return false;
  };
  const changePassword = () => {
    if (!checkPassword()) return;
  };
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
      <LinearGradient
        colors={["#d7d2cc", "#d4fcfa", "#d4fcfa", "#d4fcfa","#d7d2cc"]}
        style={{ flex: 1 }}
        end={{ x: 0, y: 0 }}
        start={{ x: 1, y: 1 }}
      >
        <View className="flex-1 relative">
          <ScrollView className="flex-1 w-screen h-screen">
            <BigHeader title="找回密码"
                       info={<BigHeader.InfoText content={`找回{${APP_NAME}}系统密码`} />}
                       containerStyle={{ backgroundColor: "none" }}>
              <CheckPermission success={success} code={code} />
              {
                success.get() &&
                <View className="w-full h-auto">
                  <FormControl
                    isInvalid={validate.get()}
                    size="md"
                    style={{ marginBottom: 20, width: "100%", marginTop: 40 }}
                  >
                    <Input variant="underlined" className="border-solid"
                           style={{ borderColor: focus.get() ? GlobalStyles.FocusBorderColor : GlobalStyles.DefaultBorderColor }}
                           size="lg">
                      <InputField
                        placeholder="请输入新密码"
                        returnKeyType="done"
                        value={password.get()}
                        onChangeText={(text) => password.set(text.trim())}
                        onFocus={() => {
                          focus.set(true);
                        }}
                        onBlur={() => {
                          focus.set(false);
                        }}
                      />
                      <Feather name="lock" style={{ marginRight: 5 }} size={16} />
                    </Input>
                    <FormControlError>
                      <FormControlErrorIcon as={AlertCircleIcon} />
                      <FormControlErrorText>
                        {"密码至少八位，且有一个大小写字母和数字"}
                      </FormControlErrorText>
                    </FormControlError>
                  </FormControl>
                  <Button color={GlobalStyles.ThemeColor1} onPress={changePassword}>
                    提交
                  </Button>
                </View>
              }
            </BigHeader>
          </ScrollView>
        </View>
      </LinearGradient>
    </>
  );
};
// noinspection JSUnusedGlobalSymbols
export default ForgetPassword;
