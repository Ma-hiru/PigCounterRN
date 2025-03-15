import { View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function Upload() {
  return (
    <>
      <StatusBar style="dark" backgroundColor="transparent" translucent={true} />
      <View className="flex-1 flex justify-center items-center w-screen h-screen bg-gray-50">
        <Text>this is upload</Text>
      </View>
    </>
  );
};
