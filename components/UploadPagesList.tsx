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
import { View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "@/settings";
import * as dayjs from "dayjs";

interface props {
  task: Task;
  taskIndex: number;
  router: ReturnType<typeof useRouter>;
}

const UploadPagesList: FC<props> = ({ task, router, taskIndex }) => {
  const startTime = dayjs.default(task.startTime).toDate();
  console.log(startTime.getMinutes());
  return (
    <>
      <View className="items-center w-[90%] shadow-2xl" style={{
        ...styles.CardStyle,
        backgroundColor: task.validation ? styles.CardStyle.backgroundColor : "#999"
      }}>
        <View className="w-screen mt-4">
          <Text style={styles.HeadText} className="text-xl font-bold">
            任务编号:{taskIndex}
          </Text>
          <Text style={{
            ...styles.HeadText,
            color: task.validation ? GlobalStyles.PositiveColor : "#666666",
            marginBottom: 5
          }}>
            {task.validation ? "已开放" : "未开放"}
          </Text>
          <Text style={styles.HeadText}>
            任务起始：{task.startTime}
          </Text>
          <Text style={styles.HeadText}>
            任务结束：{task.endTime}
          </Text>
        </View>
        <Accordion
          size="md"
          variant="filled"
          type="multiple"
          isCollapsible={true}
          isDisabled={false}
          className="mt-4 border border-outline-200"
        >
          {
            task.area.map((item, itemIndex) =>
              <Fragment key={itemIndex}>
                <AccordionItem value={item.name} isDisabled={!task.validation}>
                  <AccordionHeader>
                    <AccordionTrigger>
                      {
                        ({ isExpanded }) =>
                          (
                            <>
                              <AccordionTitleText>{item.name}</AccordionTitleText>
                              {
                                isExpanded ?
                                  <AccordionIcon as={ChevronUpIcon} className="ml-3" />
                                  :
                                  <AccordionIcon as={ChevronDownIcon} className="ml-3" />
                              }
                            </>
                          )
                      }
                    </AccordionTrigger>
                  </AccordionHeader>
                  <AccordionContent>
                    {
                      (item as { children: Area[] }).children.map((child, childIndex) => {
                          let action: GetReactProps<typeof Button>["action"];
                          if ((child as { path: string; res: number }).path !== "") {
                            if ((child as { path: string; res: number }).res >= 0)
                              action = "positive";
                            else
                              action = "secondary";
                          } else
                            action = "negative";
                          return (
                            <Button key={childIndex}
                                    onPress={
                                      goToPages(router, {
                                        pathname: "/UploadFiles",
                                        params: {
                                          title: item.name + "·" + child.name,
                                          taskIndex: [taskIndex, itemIndex, childIndex]
                                        }
                                      }, "FN")
                                    }
                                    action={action}
                                    style={
                                      childIndex !== 0 || childIndex !== (item as {
                                        children: Area[]
                                      }).children.length - 1 ? { marginBottom: 10 } : {}
                                    }
                            >
                              <ButtonText>{child.name}</ButtonText>
                            </Button>
                          );
                        }
                      )
                    }
                  </AccordionContent>
                </AccordionItem>
                {itemIndex !== task.area.length - 1 && <Divider />}
              </Fragment>
            )
          }
        </Accordion>
      </View>
    </>
  );
};
export default memo(UploadPagesList);
const styles = StyleSheet.create({
  CardStyle: {
    backgroundColor: GlobalStyles.ThemeColor,
    marginTop: 40,
    borderWidth: 1,
    borderColor: "#ffffff",
    borderRadius: 10,
    padding: 10
  },
  HeadText: {
    textAlign: "center",
    color: "#ffffff"
  }
});
