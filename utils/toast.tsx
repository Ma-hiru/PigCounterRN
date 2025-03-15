import { Toast, ToastDescription, ToastTitle, useToast } from "@/components/ui/toast";
import { ToastPlacement } from "@gluestack-ui/toast/lib/types";
import { StatusBar } from "react-native";

export const showNewToast = (toast: ReturnType<typeof useToast>, title: string, desc: string, placement: ToastPlacement = "top", duration: number = 3000, action: GetReactProps<typeof Toast>["action"] = "info") => {
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
            paddingLeft: 50,
            paddingRight: 50,
            paddingTop: 5,
            paddingBottom: 5,
            marginTop: topInset+5
          }}
        >
          <ToastTitle style={{color:"#409eff"}}>
            {title}
          </ToastTitle>
          <ToastDescription>{desc}</ToastDescription>
        </Toast>
      );
    }
  });
};
