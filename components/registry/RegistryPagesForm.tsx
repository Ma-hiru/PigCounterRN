import { validateRules, validateType } from "@/components/registry/validate";
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText
} from "@/components/ui/form-control";
import { AlertCircleIcon } from "@/components/ui/icon";
import { Input, InputField } from "@/components/ui/input";
import { FC, memo, useEffect, useMemo } from "react";
import { Updater, useImmer } from "use-immer";
import {
  Select,
  SelectTrigger,
  SelectInput,
  SelectIcon,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectItem,
  SelectScrollView
} from "@/components/ui/select";
import { ChevronDownIcon } from "@/components/ui/icon";
import { GlobalStyles } from "@/settings";
import Feather from "@expo/vector-icons/Feather";
import { useReactive } from "ahooks";

interface props {
  invalid: validateType;
  registryInfo: registryInfo;
  setRegistryInfo: Updater<registryInfo>;
}

const RegistryPagesForm: FC<props> = ({ invalid, registryInfo, setRegistryInfo }) => {
  const [focus, setFocus] = useImmer({
    usernameFocus: false,
    passwordFocus: false,
    nameFocus: false,
    phoneFocus: false,
    sexFocus: false,
    organizationFocus: false
  });
  const Text = useMemo(() => validateRules(registryInfo), [registryInfo]);
  const companyInfo = useReactive<{ name: string }[]>([]);
  /*TODO 获取组织列表*/
  useEffect(() => {
    companyInfo.push({ name: "实验" });
  }, [companyInfo]);
  return (
    <>
      <FormControl isInvalid={invalid.username} size="md" className="w-full mb-6">
        <Input variant="underlined" className="border-solid"
               style={{ borderColor: focus.usernameFocus ? GlobalStyles.FocusBorderColor : GlobalStyles.DefaultBorderColor }}
               size="lg">
          <InputField
            placeholder="请输入用户名"
            returnKeyType="next"
            placeholderTextColor=""
            value={registryInfo.username}
            onChangeText={(text) => setRegistryInfo((draft) => {
              draft.username = text.trim();
            })}
            onFocus={() => {
              setFocus(draft => {
                draft.usernameFocus = true;
              });
            }}
            onBlur={() => {
              setFocus(draft => {
                draft.usernameFocus = false;
              });
            }}
          />
          <Feather name="user" style={{ marginRight: 5 }} size={16} />
        </Input>
        <FormControlError>
          <FormControlErrorIcon as={AlertCircleIcon} />
          <FormControlErrorText>{Text.get("username")}</FormControlErrorText>
        </FormControlError>
      </FormControl>
      <FormControl isInvalid={invalid.password} size="md" className="w-full mb-6">
        <Input variant="underlined" className="border-solid"
               style={{ borderColor: focus.passwordFocus ? GlobalStyles.FocusBorderColor : GlobalStyles.DefaultBorderColor }}
               size="lg">
          <InputField
            type="password"
            placeholder="请输入密码"
            value={registryInfo.password}
            returnKeyType="done"
            onChangeText={(text) => setRegistryInfo(draft => {
              draft.password = text.trim();
            })}
            onFocus={() => {
              setFocus(draft => {
                draft.passwordFocus = true;
              });
            }}
            onBlur={() => {
              setFocus(draft => {
                draft.passwordFocus = false;
              });
            }}
          />
          <Feather name="lock" style={{ marginRight: 5 }} size={16} />
        </Input>
        <FormControlError>
          <FormControlErrorIcon as={AlertCircleIcon} />
          <FormControlErrorText>{Text.get("password")}</FormControlErrorText>
        </FormControlError>
      </FormControl>
      <FormControl isInvalid={invalid.name} size="md" className="w-full mb-6">
        <Input variant="underlined" className="border-solid"
               style={{ borderColor: focus.nameFocus ? GlobalStyles.FocusBorderColor : GlobalStyles.DefaultBorderColor }}
               size="lg">
          <InputField
            placeholder="请输入姓名"
            returnKeyType="next"
            value={registryInfo.name}
            onChangeText={(text) => setRegistryInfo(draft => {
              draft.name = text.trim();
            })}
            onFocus={() => {
              setFocus(draft => {
                draft.nameFocus = true;
              });
            }}
            onBlur={() => {
              setFocus(draft => {
                draft.nameFocus = false;
              });
            }}
          />
          <Feather name="info" style={{ marginRight: 5 }} size={16} />
        </Input>
        <FormControlError>
          <FormControlErrorIcon as={AlertCircleIcon} />
          <FormControlErrorText>{Text.get("name")}</FormControlErrorText>
        </FormControlError>
      </FormControl>
      <FormControl isInvalid={invalid.phone} size="md" className="w-full mb-6">
        <Input variant="underlined" className="border-solid"
               style={{ borderColor: focus.phoneFocus ? GlobalStyles.FocusBorderColor : GlobalStyles.DefaultBorderColor }}
               size="lg">
          <InputField
            placeholder="请输入电话"
            returnKeyType="next"
            value={registryInfo.phone}
            onChangeText={(text) => setRegistryInfo(draft => {
              if (text.trim().length <= 11)
                draft.phone = text.trim();
            })}
            onFocus={() => {
              setFocus(draft => {
                draft.phoneFocus = true;
              });
            }}
            onBlur={() => {
              setFocus(draft => {
                draft.phoneFocus = false;
              });
            }}
          />
          <Feather name="tablet" style={{ marginRight: 5 }} size={16} />
        </Input>
        <FormControlError>
          <FormControlErrorIcon as={AlertCircleIcon} />
          <FormControlErrorText>{Text.get("phone")}</FormControlErrorText>
        </FormControlError>
      </FormControl>
      <FormControl isInvalid={invalid.sex} size="md" className="w-full mb-6">
        <Select isRequired onValueChange={(text) => setRegistryInfo(draft => {
          draft.sex = text;
        })}>
          <SelectTrigger
            variant="underlined"
            size="lg"
            className="flex justify-between items-center flex-row h-auto border-solid"
            style={{ borderColor: focus.sexFocus ? GlobalStyles.FocusBorderColor : GlobalStyles.DefaultBorderColor }}
          >
            <SelectInput
              placeholder="请选择性别"
              onFocus={() => {
                setFocus(draft => {
                  draft.sexFocus = true;
                });
              }}
              onBlur={() => {
                setFocus(draft => {
                  draft.sexFocus = false;
                });
              }}
            />
            <SelectIcon as={ChevronDownIcon} style={{ marginRight: 5 }} />
          </SelectTrigger>
          <SelectPortal>
            <SelectBackdrop />
            <SelectContent>
              <SelectDragIndicatorWrapper>
                <SelectDragIndicator />
              </SelectDragIndicatorWrapper>
              <SelectItem label="男" value="男" />
              <SelectItem label="女" value="女" />
            </SelectContent>
          </SelectPortal>
        </Select>
        <FormControlError>
          <FormControlErrorIcon as={AlertCircleIcon} />
          <FormControlErrorText>{Text.get("sex")}</FormControlErrorText>
        </FormControlError>
      </FormControl>
      <FormControl isInvalid={invalid.organization} size="md" className="w-full mb-6">
        <Select
          isRequired
          onValueChange={(text) => setRegistryInfo(draft => {
            draft.organization = text.trim();
          })}
        >
          <SelectTrigger
            variant="underlined"
            size="lg"
            className="flex justify-between items-center flex-row h-auto border-solid"
            style={{ borderColor: focus.phoneFocus ? GlobalStyles.FocusBorderColor : GlobalStyles.DefaultBorderColor }}
          >
            <SelectInput
              placeholder="请选择组织"
              onFocus={() => {
                setFocus(draft => {
                  draft.organizationFocus = true;
                });
              }}
              onBlur={() => {
                setFocus(draft => {
                  draft.organizationFocus = false;
                });
              }}
            />
            <SelectIcon as={ChevronDownIcon} style={{ marginRight: 5 }} />
          </SelectTrigger>
          <SelectPortal>
            <SelectBackdrop />
            <SelectContent>
              <SelectDragIndicatorWrapper>
                <SelectDragIndicator />
              </SelectDragIndicatorWrapper>
              <SelectScrollView style={{ height: "auto", maxHeight: 500 }}>
                {
                  companyInfo.map((item, index) =>
                    <SelectItem label={item.name} value={item.name} key={index} />)
                }

              </SelectScrollView>
            </SelectContent>
          </SelectPortal>
        </Select>
        <FormControlError>
          <FormControlErrorIcon as={AlertCircleIcon} />
          <FormControlErrorText>{Text.get("organization")}</FormControlErrorText>
        </FormControlError>
      </FormControl>
    </>
  );
};
export default memo(RegistryPagesForm);
