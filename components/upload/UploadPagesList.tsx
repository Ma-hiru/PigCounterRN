import CountDown from "@/components/upload/CountDown";
import { FC, Fragment, useSyncExternalStore } from "react";
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
          backgroundColor: validation ? styles.CardStyle.backgroundColor : GlobalStyles.DisabledColor
        }}
      >
        <View style={styles.Header} className="mb-4">
          <View>
            <View style={styles.Head}>
              <Text style={styles.Tags}>任务</Text>
              <Text style={{ ...styles.HeadText, ...styles.HeadTitle }}
                    className="text-2xl font-bold justify-center items-center">
                编号 {taskIndex + 1}
              </Text>
            </View>
            {
              validation ?
              <Text style={{ ...styles.HeadText, textAlign: "left" }}>
                <CountDown endTime={endTime.getTime()} format={format} />
              </Text> :
              <Text style={{
                ...styles.HeadText,
                color: validation ? GlobalStyles.PositiveColor : GlobalStyles.NegativeColor,
                textAlign: "left"
              }}>
                未开放
              </Text>
            }
          </View>
          <View>
            <Text style={{
              ...styles.HeadText,
              color: GlobalStyles.ThemeColor3
            }}>任务起始：{task.startTime}</Text>
            <Text style={{
              ...styles.HeadText,
              color: GlobalStyles.ThemeColor3
            }}>任务结束：{task.endTime}</Text>
          </View>
        </View>
        <Accordion
          size="md" variant="filled" type="multiple"
          isCollapsible={true} isDisabled={false}
          className="mt-4 border border-outline-200"
        >
          {
            task.buildings?.map((building, buildingIndex) =>
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
                          if (pen.picturePath !== "")
                            action = pen.penNum >= 0 ? "positive" : "secondary";
                          return (
                            <Button
                              key={pen.penId}
                              onPress={goToPages(
                                router,
                                {
                                  pathname: "/UploadFiles",
                                  params: {
                                    title: `楼栋${building.buildingId} · 栏舍${pen.penId}`,
                                    taskIndex: [taskIndex, buildingIndex, penIndex],
                                    penId: pen.penId
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
    backgroundColor: GlobalStyles.UploadCardBg,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: GlobalStyles.UploadCardBg,
    borderRadius: 10,
    padding: 10
  },
  HeadText: {
    textAlign: "left",
    color: GlobalStyles.UploadCardColor,
    width: "auto"
  },
  HeadTitle: {
    textAlign: "left"
  },
  Tags: {
    backgroundColor: GlobalStyles.ThemeColor,
    color: GlobalStyles.TagsText,
    padding: 2,
    fontWeight: 500,
    marginRight: 5
  },
  Head: {
    justifyContent: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    width: "auto"
  },
  Header: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    width: "100%"
  }
});
