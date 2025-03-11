import { Toast, ToastDescription, ToastTitle, useToast } from "@/components/ui/toast";
import { ToastPlacement } from "@gluestack-ui/toast/lib/types";
import { getProps } from "@/global";


export const showNewToast = (toast: ReturnType<typeof useToast>, title: string, desc: string, placement: ToastPlacement = "top", duration: number = 3000, action: getProps<typeof Toast>["action"] = "muted") => {
  toast.show({
    id: String(Math.random()),
    placement,
    duration,
    render: ({ id }) => {
      const uniqueToastId = "toast-" + id;
      return (
        <Toast nativeID={uniqueToastId} action={action} variant="solid">
          <ToastTitle>{title}</ToastTitle>
          <ToastDescription>{desc}</ToastDescription>
        </Toast>
      );
    }
  });
};
