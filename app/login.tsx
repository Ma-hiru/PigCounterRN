import {View, Text, StyleSheet} from "react-native";
import {Button, ButtonIcon, ButtonText} from "@/components/ui/button";
import {Input, InputField} from "@/components/ui/input"
import {
    FormControl,
    FormControlError,
    FormControlErrorText,
    FormControlErrorIcon,
    FormControlLabel,
    FormControlLabelText,
    FormControlHelper,
    FormControlHelperText,
} from "@/components/ui/form-control"
import {AlertCircleIcon, ArrowLeftIcon, ArrowRightIcon} from "@/components/ui/icon"
import {useState} from "react"
import {Box} from "@/components/ui/box";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isInvalidUsername, setIsInvalidUsername] = useState(false)
    const [isInvalidPassword, setIsInvalidPassword] = useState(false)
    const handleSubmit = () => {
        if (password.length < 6) setIsInvalidPassword(true)
        else setIsInvalidPassword(false)
        if (username.length < 4) setIsInvalidUsername(true)
        else setIsInvalidUsername(false)
        
    }
    return (
        <View className="flex justify-center items-center w-screen h-screen">
            <View className="flex justify-center items-center w-[80%] space-y-4">
                <View className="w-full flex justify-center items-center flex-row select-none font-bold"
                >
                    <Text className="color-[#c38b95] text-xl">猪只</Text>
                    <Text className="color-[#409eff] text-xl">计数</Text>
                </View>
                <FormControl isInvalid={isInvalidUsername} size="md" className="w-full">
                    <Input variant="outline" size="md">
                        <InputField
                            placeholder="请输入用户名"
                            value={username}
                            onChangeText={(text) => setUsername(text)}
                        />
                    </Input>
                    <FormControlError>
                        <FormControlErrorIcon as={AlertCircleIcon}/>
                        <FormControlErrorText>
                            用户名至少需要四位字符
                        </FormControlErrorText>
                    </FormControlError>
                </FormControl>
                <FormControl isInvalid={isInvalidPassword} size="md" className="w-full">
                    <Input className="my-1" size={"md"}>
                        <InputField
                            type="password"
                            placeholder="请输入密码"
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                        />
                    </Input>
                    <FormControlError>
                        <FormControlErrorIcon as={AlertCircleIcon}/>
                        <FormControlErrorText>
                            密码至少需要六位字符
                        </FormControlErrorText>
                    </FormControlError>
                </FormControl>
                <Button
                    className="w-full bg-[#409eff]  "
                    size="md"
                    variant="solid"
                    action="positive"
                    onPress={handleSubmit}
                >
                    <ButtonText>登录</ButtonText>
                </Button>
                <View className="flex flex-row w-full justify-end">
                    <Button variant="link" size="sm" className="p-0">
                        <ButtonText>忘记密码？</ButtonText>
                    </Button>
                </View>
            </View>
        </View>
    );
};