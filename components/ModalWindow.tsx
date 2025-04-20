import { Button, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import {
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "@/components/ui/modal";
import { Text } from "@/components/ui/text";
import { Icon, CloseIcon } from "@/components/ui/icon";
import { FC, ReactNode } from "react";
import { MyState } from "@/hooks/useMyState";
import logger from "@/utils/logger";
import { GlobalStyles } from "@/settings";

type props = {
  show: MyState<boolean>;
  title: ReactNode;
  children?: ReactNode;
  confirm?: (() => void) | (() => Promise<void>);
  cancel?: () => void;
}
const ModalWindow: FC<props> = ({ show, children, title, confirm, cancel }) => {
  logger("console", "modalstart", "show:", show.get());
  return (
    <Modal
      isOpen={show.get()}
      onClose={() => {
        show.set(false);
        cancel && cancel();
      }}
      size="md"
    >
      <ModalBackdrop />
      <ModalContent>
        <ModalHeader>
          <Heading size="md" className="text-typography-950">
            {
              typeof title === "string" ? <Text>{title}</Text> : title
            }
          </Heading>
          <ModalCloseButton>
            <Icon as={CloseIcon} size="md"
                  className="stroke-background-400 group-[:hover]/modal-close-button:stroke-background-700 group-[:active]/modal-close-button:stroke-background-900 group-[:focus-visible]/modal-close-button:stroke-background-900" />
          </ModalCloseButton>
        </ModalHeader>
        <ModalBody>
          {children}
        </ModalBody>
        <ModalFooter>
          <Button
            variant="outline"
            action="secondary"
            onPress={() => {
              show.set(false);
            }}
          >
            <ButtonText>取消</ButtonText>
          </Button>
          <Button
            onPress={async () => {
              if (confirm) {
                const res = confirm();
                if (res && typeof res?.then === "function")
                  await res;
              }
              show.set(false);
            }}
            variant="outline"
            style={{
              backgroundColor: GlobalStyles.ThemeColor1,
              borderColor: GlobalStyles.ThemeColor1
            }}
          >
            <ButtonText style={{ color: "white" }}>确定</ButtonText>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export default ModalWindow;
