import { FC, Fragment, memo } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionHeader, AccordionIcon,
  AccordionItem,
  AccordionTitleText,
  AccordionTrigger
} from "@/components/ui/accordion";
import { ChevronDownIcon, ChevronUpIcon } from "@/components/ui/icon";
import { Area, Task } from "@/types/task";
import { Button, ButtonText } from "@/components/ui/button";
import { goToPages } from "@/utils/goToPages";
import { Divider } from "@/components/ui/divider";
import { useRouter } from "expo-router";
import { View, Text } from "react-native";

interface props {
  task: Task,
  router: ReturnType<typeof useRouter>
}

const UploadPagesList: FC<props> = ({ task, router }) => {
  return (
    <>
      <View className="w-screen mt-4">
        <Text className="font-bold text-center">任务时间：{task.time}</Text>
      </View>
      <Accordion
        size="md"
        variant="filled"
        type="multiple"
        isCollapsible={true}
        isDisabled={false}
        className="m-5 w-[90%] border border-outline-200"
      >
        {task.area.map((item, index) =>
          <Fragment key={index}>
            <AccordionItem value={item.name} isDisabled={!task.validation}>
              <AccordionHeader>
                <AccordionTrigger>
                  {({ isExpanded }) => {
                    return (
                      <>
                        <AccordionTitleText>
                          {item.name}
                        </AccordionTitleText>
                        {isExpanded ? (
                          <AccordionIcon as={ChevronUpIcon} className="ml-3" />
                        ) : (
                          <AccordionIcon as={ChevronDownIcon} className="ml-3" />
                        )}
                      </>
                    );
                  }}
                </AccordionTrigger>
              </AccordionHeader>
              <AccordionContent>
                {
                  (item as { children: Area[] }).children.map((child, index) =>
                    <Button
                      key={index}
                      onPress={goToPages(router, {
                        pathname: "/UploadFiles",
                        params: {
                          title: item.name + "-" + child.name,
                          id: [task.id, item.id, child.id]
                        }
                      }, "FN")}
                      action="positive"
                      style={
                        index !== 0 || index !== (item as {
                          children: Area[]
                        }).children.length - 1 ? { marginBottom: 10 } : {}
                      }
                    >
                      <ButtonText>{child.name}</ButtonText>
                    </Button>
                  )
                }
              </AccordionContent>
            </AccordionItem>
            <Divider />
          </Fragment>
        )}
      </Accordion>
    </>
  );
};
export default memo(UploadPagesList);
