import { FC } from "react";
import { StyleProp, Text, View, ViewStyle } from "react-native";
import MyPagesCard from "@/components/my/MyPagesCard";
import MyPopover from "@/components/MyPopover";
import { Button } from "@rneui/base";
import { GlobalStyles } from "@/settings";
import { useMyState } from "@/hooks/useMyState";

type props = {
  time?: string;
  type?: string;
  content?: string;
  isRead?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
};

const NoticeItem: FC<props> = ({ time, type, content, isRead, containerStyle }) => {
  const popover = useMyState(false);
  return (
    <>
      <MyPagesCard
        cardStyle={{ marginBottom: 10, paddingBottom: 15, ...containerStyle as object }}
        title={time}
        titleStyle={{ fontSize: 16 }}
      >
        <MyPopover open={popover.get()} options={
          <>
            <View className="flex-row">
              <Button color={GlobalStyles.ThemeColor}>已读</Button>
              <Button color={GlobalStyles.ThemeColor}>删除</Button>
            </View>
          </>
        }>
          <MyPagesCard.CanPress onLongPress={() => {
            popover.set(true);
          }}>
            <Text>{content}</Text>
          </MyPagesCard.CanPress>
        </MyPopover>
      </MyPagesCard>
    </>
  );
};
export default NoticeItem;
