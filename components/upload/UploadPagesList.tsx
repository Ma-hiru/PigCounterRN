import CountDown from "@/components/CountDown";
import { FC, Fragment, useEffect, useMemo, useState, useSyncExternalStore } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionHeader, AccordionIcon,
  AccordionItem,
  AccordionTitleText,
  AccordionTrigger
} from "@/components/ui/accordion";
import { ChevronDownIcon, ChevronUpIcon } from "@/components/ui/icon";
import { Task } from "@/types/task";
import { Button, ButtonText } from "@/components/ui/button";
import { goToPages } from "@/utils/goToPages";
import { Divider } from "@/components/ui/divider";
import { useRouter } from "expo-router";
import { View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "@/settings";
import * as dayjs from "dayjs";
import * as duration from "dayjs/plugin/duration";

interface props {
  task: Task;
  taskIndex: number;
  router: ReturnType<typeof useRouter>;
}

dayjs.default.extend(duration.default);
type btnAction = GetReactProps<typeof Button>["action"];
const format = (time: number) => {
  return dayjs.default.duration(time, "milliseconds").format("HH时mm分ss秒");
};
const UploadPagesList: FC<props> = ({ task, router, taskIndex }) => {
  const endTime = dayjs.default(task.endTime).toDate();
  const startTime = dayjs.default(task.startTime).toDate();
  const validation = useSyncExternalStore(
    (listener) => {
      const timer = setInterval(listener, 1000);
      return () => clearInterval(timer);
    },
    () => !(startTime.getTime() <= Date.now() && Date.now() <= endTime.getTime())
  );
  return (
    <>
      <View
        className="items-center w-[90%] shadow-2xl"
        style={{
          ...styles.CardStyle,
          backgroundColor: validation ? styles.CardStyle.backgroundColor : "#999"
        }}
      >
        <View className="w-screen mt-4">
          <Text style={styles.HeadText} className="text-xl font-bold">
            任务编号:{taskIndex + 1}
          </Text>
          <Text style={{
            ...styles.HeadText,
            color: validation ? GlobalStyles.PositiveColor : "#666666",
            marginBottom: 5
          }}>
            {validation ? "已开放" : "未开放"}
          </Text>
          {
            validation &&
            <Text style={styles.HeadText}>
              剩余时间：<CountDown endTime={endTime.getTime()} format={format} />
            </Text>
          }
          <Text style={styles.HeadText}>任务起始：{task.startTime}</Text>
          <Text style={styles.HeadText}>任务结束：{task.endTime}</Text>
        </View>
        <Accordion
          size="md" variant="filled" type="multiple"
          isCollapsible={true} isDisabled={false}
          className="mt-4 border border-outline-200"
        >
          {
            task.buildings.map((building, buildingIndex) =>
              <Fragment key={buildingIndex}>
                <AccordionItem
                  value={String(building.buildingId)}
                  isDisabled={!validation}
                >
                  <AccordionHeader>
                    <AccordionTrigger>
                      {
                        ({ isExpanded }) =>
                          <>
                            <AccordionTitleText>{building.buildingId}</AccordionTitleText>
                            {
                              isExpanded ?
                              <AccordionIcon as={ChevronUpIcon} className="ml-3" /> :
                              <AccordionIcon as={ChevronDownIcon} className="ml-3" />
                            }
                          </>
                      }
                    </AccordionTrigger>
                  </AccordionHeader>
                  <AccordionContent>
                    {
                      building.pens.map((pen, penIndex) => {
                          let action: btnAction = "negative";
                          if ("path" in pen && "res" in pen && pen.path !== "")
                            action = pen.res >= 0 ? "positive" : "secondary";
                          return (
                            <Button
                              key={pen.penId}
                              onPress={goToPages(
                                router,
                                {
                                  pathname: "/UploadFiles",
                                  params: {
                                    title: building.buildingId + "·" + pen.penId,
                                    taskIndex: [taskIndex, buildingIndex, penIndex]
                                  }
                                },
                                "FN"
                              )}
                              action={action}
                              style={
                                penIndex !== 0 || penIndex !== building.pens.length - 1 ? { marginBottom: 10 } : {}
                              }
                            >
                              <ButtonText>{pen.penId}</ButtonText>
                            </Button>
                          );
                        }
                      )
                    }
                  </AccordionContent>
                </AccordionItem>
                {buildingIndex !== task.buildings.length - 1 && <Divider />}
              </Fragment>
            )
          }
        </Accordion>
      </View>
    </>
  );
};
export default UploadPagesList;
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
