import { Toast, useToast } from "@/components/ui/toast";
import { ToastPlacement } from "@gluestack-ui/toast/lib/types";
import { StatusBar, Text } from "react-native";
import { GlobalStyles } from "@/settings";

export const showNewToast = (
  toast: ReturnType<typeof useToast>,
  title: string,
  desc: string,
  placement: ToastPlacement = "top",
  duration: number = 3000,
  action: GetReactProps<typeof Toast>["action"] = "muted") => {
  const topInset = StatusBar.currentHeight ?? 0;
  toast.show({
    id: String(Math.random()),
    placement,
    duration,
    render: ({ id }) => {
      const uniqueToastId = "toast-" + id;
      return (
        <Toast
          nativeID={uniqueToastId}
          action={action}
          variant="outline"
          style={{
            marginTop: topInset + 5,
            backgroundColor: GlobalStyles.ThemeColor1,
            borderWidth:0
          }}
        >
          {
            title !== "" &&
            <Text style={{
              color: GlobalStyles.SecondColor,
              fontSize: 16,
              fontFamily: "FlyFlowerSongRegular" as Fonts
            }}>
              {title}
            </Text>
          }
          <Text style={{
            color: "#fff",
            fontFamily: "FlyFlowerSongRegular" as Fonts
          }}>
            {desc}
          </Text>
        </Toast>
      );
    }
  });
};
