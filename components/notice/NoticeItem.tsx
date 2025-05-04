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
import { BlurView } from "expo-blur";

type props = {
  time?: string;
  type?: string;
  content?: string;
  isRead?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  readItem?: () => void;
  deleteItem?: () => void;
  clickArea: MyState<boolean>;
};

const NoticeItem: FC<props> = (
  {
    time,
    type,
    content,
    isRead,
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
              <BlurView style={{
                marginBottom: 10,
                borderRadius: 20,
              }}>
                <MyPagesCard
                  className="shadow-2xl"
                  cardStyle={{
                    ...containerStyle as object,
                    borderRadius: 20,
                    overflow: "hidden",
                    backgroundColor: "rgba(255,255,255,0.7)"
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
                              readItem && readItem();
                            }}>{isRead ? "未读" : "已读"}</Button>
                          </View>
                          <View style={[styles.PopoverBtnContainer, styles.rightBtn]}>
                            <Button color={GlobalStyles.ThemeColor} onPress={() => {
                              popover.set(false);
                              deleteItem && deleteItem();
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
                            <Text style={{ color: "#fff" }}>{type}</Text>
                          </View>
                        </View>
                        <View className="flex-row justify-center items-center">
                          <Text className="text-sm"
                                style={{ fontWeight: "normal", textAlign: "right" }}>
                            {time}
                          </Text>
                          <Image source={isRead ? read : notRead}
                                 style={{ width: 20, height: 20 }} />
                        </View>
                      </View>
                      <View style={{ marginTop: 10 }}>
                        <Text>{content}</Text>
                      </View>
                    </View>
                  </MyPopover>
                </MyPagesCard>
              </BlurView>
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
