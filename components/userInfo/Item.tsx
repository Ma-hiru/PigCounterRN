import { useNavigation } from "expo-router";
import { FC, ReactNode } from "react";
import { View, Text } from "react-native";

interface props {
  title: string;
  children?: ReactNode;
}

const Item: FC<props> = ({ children, title }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const navigation = useNavigation();
  return (
    <>
      <View className="mb-4 w-full flex-row justify-between items-center shadow-2xl bg-white p-4 h-auto"
            style={{ borderRadius: 5 }}>
        <Text className="text-xl">{title}</Text>
        {children}
      </View>
    </>
  );
};
export default Item;
