import { FC, useEffect } from "react";
import { StatusBar, View, Pressable } from "react-native";
import BigHeader from "@/components/BigHeader";
import { APP_NAME, NO_LOGIN_TIPS } from "@/settings";
import NoticeItem from "@/components/notice/NoticeItem";
import { useMyState } from "@/hooks/useMyState";
import { useLogin } from "@/hooks/useLogin";
import Blank from "@/components/Blank";
import { LinearGradient } from "expo-linear-gradient";


type props = object;

const Notice: FC<props> = () => {
  const clickArea = useMyState(false);
  const items = useMyState<Notice[]>([
    {
      id: 0,
      companyId: 0,
      employeeId: 0,
      time: "2025-04-22",
      type: "系统",
      content: "系统提示：识别系统全新升级，敬请使用！系统提示：识别系统全新升级，敬请使用！系统提示：识别系统全新升级，敬请使用！系统提示：识别系统全新升级，敬请使用！",
      read: false,
      del: false
    },
    {
      id: 1,
      companyId: 0,
      employeeId: 0,
      time: "2025-04-22",
      type: "系统",
      content: "过期提醒：任务一即将过期，请及时处理",
      read: false,
      del: false
    },
    {
      id: 2,
      companyId: 0,
      employeeId: 0,
      time: "2025-04-22",
      type: "组织",
      content: "组织公告：抓紧完成上传任务一。",
      read: false,
      del: false
    }
  ]);
  const { hasToken } = useLogin();
  useEffect(() => {
//TODO
  }, []);
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
      <LinearGradient
        colors={["#d7d2cc", "#d4fcfa", "#d4fcfa", "#d4fcfa", "#d7d2cc"]}
        style={{ flex: 1 }}
        end={{ x: 0, y: 0 }}
        start={{ x: 1, y: 1 }}
      >
        <Pressable style={{ flex: 1 }} onPress={() => {
          clickArea.set(true);
        }}>
          <View className="flex-1">
            <BigHeader title="公告"
                       info={<BigHeader.InfoText content={`查看{${APP_NAME}}系统公告`} />
                       }
                       containerStyle={{ backgroundColor: "transparent" }}
            >
              <View style={{ marginTop: 30 }} />
              {
                hasToken && items.get().map((item, index) => {
                  return !item.del && <NoticeItem
                    clickArea={clickArea}
                    notice={item}
                    readItem={() => {/*TODO*/
                    }}
                    deleteItem={() => {
                      /*TODO*/
                    }}
                  />;
                })
              }
            </BigHeader>
            {!hasToken && <Blank tips={NO_LOGIN_TIPS} />}
          </View>
        </Pressable>
      </LinearGradient>
    </>
  );
};
export default Notice;
