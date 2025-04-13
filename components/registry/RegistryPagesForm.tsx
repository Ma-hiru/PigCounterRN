import { validateRules } from "@/components/registry/validate";
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText
} from "@/components/ui/form-control";
import { AlertCircleIcon } from "@/components/ui/icon";
import { Input, InputField } from "@/components/ui/input";
import { registryInfo } from "@/types/api";
import { FC, memo, useMemo } from "react";
import { Updater } from "use-immer";
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

interface props {
  invalid: Omit<Record<keyof registryInfo, boolean>, "id">;
  registryInfo: registryInfo;
  setRegistryInfo: Updater<registryInfo>;
}

const RegistryPagesForm: FC<props> = ({ invalid, registryInfo, setRegistryInfo }) => {
  const Text = useMemo(() => validateRules(registryInfo), [registryInfo]);
  return (
    <>
      <FormControl isInvalid={invalid.username} size="md" className="w-full mb-4">
        <Input variant="outline" size="lg">
          <InputField
            placeholder="请输入用户名"
            returnKeyType="next"
            value={registryInfo.username}
            onChangeText={(text) => setRegistryInfo((draft) => {
              draft.username = text;
            })}
          />
        </Input>
        <FormControlError>
          <FormControlErrorIcon as={AlertCircleIcon} />
          <FormControlErrorText>{Text.get("username")}</FormControlErrorText>
        </FormControlError>
      </FormControl>
      <FormControl isInvalid={invalid.password} size="md" className="w-full mb-6">
        <Input size="lg">
          <InputField
            type="password"
            placeholder="请输入密码"
            value={registryInfo.password}
            returnKeyType="done"
            onChangeText={(text) => setRegistryInfo(draft => {
              draft.password = text;
            })}
          />
        </Input>
        <FormControlError>
          <FormControlErrorIcon as={AlertCircleIcon} />
          <FormControlErrorText>{Text.get("password")}</FormControlErrorText>
        </FormControlError>
      </FormControl>
      <FormControl isInvalid={invalid.name} size="md" className="w-full mb-4">
        <Input variant="outline" size="lg">
          <InputField
            placeholder="请输入姓名"
            returnKeyType="next"
            value={registryInfo.name}
            onChangeText={(text) => setRegistryInfo(draft => {
              draft.name = text;
            })}
          />
        </Input>
        <FormControlError>
          <FormControlErrorIcon as={AlertCircleIcon} />
          <FormControlErrorText>{Text.get("name")}</FormControlErrorText>
        </FormControlError>
      </FormControl>
      <FormControl isInvalid={invalid.phone} size="md" className="w-full mb-4">
        <Input variant="outline" size="lg">
          <InputField
            placeholder="请输入电话"
            returnKeyType="next"
            value={registryInfo.phone}
            onChangeText={(text) => setRegistryInfo(draft => {
              draft.phone = text;
            })}
          />
        </Input>
        <FormControlError>
          <FormControlErrorIcon as={AlertCircleIcon} />
          <FormControlErrorText>{Text.get("phone")}</FormControlErrorText>
        </FormControlError>
      </FormControl>
      <FormControl isInvalid={invalid.sex} size="md" className="w-full mb-4">
        <Select isRequired onValueChange={(text) => setRegistryInfo(draft => {
          draft.sex = text;
        })}>
          <SelectTrigger
            variant="underlined"
            size="lg"
            className="flex justify-between items-center flex-row h-auto"
          >
            <SelectInput placeholder="请选择性别" style={{ paddingLeft: 12 }} />
            <SelectIcon as={ChevronDownIcon} />
          </SelectTrigger>
          <SelectPortal>
            <SelectBackdrop />
            <SelectContent>
              <SelectDragIndicatorWrapper>
                <SelectDragIndicator />
              </SelectDragIndicatorWrapper>
              <SelectItem label="男" value="male" />
              <SelectItem label="女" value="female" />
            </SelectContent>
          </SelectPortal>
        </Select>
        <FormControlError>
          <FormControlErrorIcon as={AlertCircleIcon} />
          <FormControlErrorText>{Text.get("sex")}</FormControlErrorText>
        </FormControlError>
      </FormControl>
      <FormControl isInvalid={invalid.organization} size="md" className="w-full mb-4">
        <Select
          isRequired
          onValueChange={(text) => setRegistryInfo(draft => {
            draft.organization = text;
          })}
        >
          <SelectTrigger
            variant="underlined"
            size="lg"
            className="flex justify-between items-center flex-row h-auto"
          >
            <SelectInput placeholder="请选择组织" style={{ paddingLeft: 12 }} />
            <SelectIcon as={ChevronDownIcon} />
          </SelectTrigger>
          <SelectPortal>
            <SelectBackdrop />
            <SelectContent>
              <SelectDragIndicatorWrapper>
                <SelectDragIndicator />
              </SelectDragIndicatorWrapper>
              <SelectScrollView style={{ height: "auto", maxHeight: 500 }}>
                <SelectItem label="公司一" value="male" />
                <SelectItem label="公司二" value="female" />
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
