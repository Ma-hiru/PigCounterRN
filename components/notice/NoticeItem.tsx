import { FC, memo, useEffect } from "react";
import { InteractionManager, StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";
import MyPagesCard from "@/components/my/MyPagesCard";
import MyPopover from "@/components/MyPopover";
import { Button } from "@rneui/base";
import { GlobalStyles } from "@/settings";
import { MyState, useMyState } from "@/hooks/useMyState";
import read from "@/assets/images/has_read.svg";
import notRead from "@/assets/images/not_read.svg";
import { Image } from "expo-image";
import PressFeedback from "@/components/animate/PressFeedback";

type props = {
  notice: Notice;
  containerStyle?: StyleProp<ViewStyle>;
  readItem?: (id: number) => void;
  deleteItem?: (id: number) => void;
  clickArea: MyState<boolean>;
};

const NoticeItem: FC<props> = (
  {
    notice,
    containerStyle,
    readItem,
    deleteItem,
    clickArea
  }) => {
  const popover = useMyState(false);
  useEffect(() => {
    if (popover.get() && clickArea.get()) {
      clickArea.set(false);
      popover.set(false);
    }
    if (!popover.get() && clickArea.get()) {
      clickArea.set(false);
    }
  }, [clickArea, popover]);
  return (
    <>
      <PressFeedback
        containerStyle={{ width: "100%" }}
        onPress={() => {
          clickArea.set(true);
          InteractionManager.runAfterInteractions(() => {
            popover.set(true);
          });
        }}
      >
        {
          ({ pressed }) =>
            <>
              <MyPagesCard
                className="shadow-2xl"
                cardStyle={{
                  ...containerStyle as object,
                  borderRadius: 20,
                  marginTop: 10,
                  backgroundColor: GlobalStyles.BlurBgCardColor
                }}
              >
                <MyPopover
                  open={popover.get()}
                  options={
                    <>
                      <View className="flex-row">
                        <View style={[styles.PopoverBtnContainer, styles.leftBtn]}>
                          <Button color={GlobalStyles.ThemeColor} onPress={() => {
                            popover.set(false);
                            readItem && readItem(notice.id);
                          }}>{notice.read ? "未读" : "已读"}</Button>
                        </View>
                        <View style={[styles.PopoverBtnContainer, styles.rightBtn]}>
                          <Button color={GlobalStyles.ThemeColor} onPress={() => {
                            popover.set(false);
                            deleteItem && deleteItem(notice.id);
                          }}>删除</Button>
                        </View>
                      </View>
                    </>
                  }
                >
                  <View style={[pressed && styles.Shadow, containerStyle]}>
                    <View className="flex-row justify-between" style={{ padding: 2 }}>
                      <View style={{ width: "auto" }}>
                        <View
                          style={{
                            backgroundColor: GlobalStyles.ThemeColor1,
                            padding: 2,
                            paddingHorizontal: 5,
                            borderRadius: 5,
                            width: "auto"
                          }}>
                          <Text style={{ color: "#fff" }}>{notice.type}</Text>
                        </View>
                      </View>
                      <View className="flex-row justify-center items-center">
                        <Text className="text-sm"
                              style={{ fontWeight: "normal", textAlign: "right" }}>
                          {notice.time}
                        </Text>
                        <Image source={notice.read ? read : notRead}
                               style={{ width: 20, height: 20 }} />
                      </View>
                    </View>
                    <View style={{ marginTop: 10 }}>
                      <Text style={{ color: "#333" }}>{notice.content}</Text>
                    </View>
                  </View>
                </MyPopover>
              </MyPagesCard>
            </>
        }
      </PressFeedback>

    </>
  );
};
export default memo(NoticeItem);
const styles = StyleSheet.create({
  PopoverBtnContainer: {
    backgroundColor: GlobalStyles.ThemeColor,
    borderRadius: 5,
    overflow: "hidden"
  },
  leftBtn: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0
  },
  rightBtn: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0
  },
  container: {
    padding: 10,
    borderRadius: 5
  },
  Shadow: {
    backgroundColor: "rgba(153,153,153,0.17)",
    borderRadius: 5
  }
});
