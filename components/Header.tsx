import { useSafeArea } from "@/hooks/useSafeArea";
import { GlobalStyles } from "@/settings";
import { FC } from "react";
import { View, Text } from "react-native";
import { Shadow } from "react-native-shadow-2";

interface props {
  height?: number;
  title?: string;
  className?: string;
}

const Header: FC<props> = ({ height = 45, title, className }) => {
  const { topInset } = useSafeArea();
  return (
    <>
      <Shadow  containerStyle={{ backgroundColor: "#fff" }}>
        <View className="h-auto justify-center items-start w-screen pl-8"
              style={{ height: height + topInset, paddingTop: topInset }}>
          <Text className="text-2xl font-bold"
                style={{ color: GlobalStyles.HeaderText }}>
            {title}
          </Text>
        </View>
      </Shadow>
      <View style={{ marginBottom: 10 }} />
    </>
  );
};
export default Header;
