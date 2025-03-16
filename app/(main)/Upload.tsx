import { View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionTitleText,
  AccordionContentText,
  AccordionIcon,
  AccordionContent
} from "@/components/ui/accordion";
import { Divider } from "@/components/ui/divider";
import { ChevronUpIcon, ChevronDownIcon } from "@/components/ui/icon";
import { useSafeArea } from "@/hooks/useSafeArea";
import { ButtonText, Button } from "@/components/ui/button";
import { Fragment } from "react";
import { goToPages } from "@/utils/goToPages";
import { useRouter } from "expo-router";

export default function Upload() {
  const { topInset } = useSafeArea();
  const router = useRouter();
  const AccordionList = [
    {
      name: "楼栋一",
      children: [
        {
          name: "兰舍1"
        },
        {
          name: "兰舍2"
        },
        {
          name: "兰舍3"
        }
      ]
    },
    {
      name: "楼栋二",
      children: [
        {
          name: "兰舍1"
        },
        {
          name: "兰舍2"
        },
        {
          name: "兰舍3"
        }
      ]
    },
    {
      name: "楼栋三",
      children: [
        {
          name: "兰舍1"
        },
        {
          name: "兰舍2"
        },
        {
          name: "兰舍3"
        }
      ]
    }
  ];
  return (
    <>
      <StatusBar style="dark" backgroundColor="transparent" translucent={true} />
      <View className="flex-1 w-screen h-screen bg-gray-50" style={{ paddingTop: topInset }}>
        <Accordion
          size="md"
          variant="filled"
          type="multiple"
          isCollapsible={true}
          isDisabled={false}
          className="m-5 w-[90%] border border-outline-200"
        >
          {AccordionList.map((item, index) => (
            <Fragment key={index}>
              <AccordionItem value={item.name}>
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
                    item.children.map((child, index) =>
                      <Button
                        key={index}
                        onPress={goToPages(router, "/UploadFiles", "FN")}
                        style={
                          index !== 0 || index !== item.children.length - 1 ? { marginBottom: 10 } : {}
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
          ))}
        </Accordion>
      </View>

    </>
  );
};
