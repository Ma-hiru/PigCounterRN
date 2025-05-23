import { ScrollView, StatusBar, View } from "react-native";
import { useFocusEffect, useNavigation } from "expo-router";
import { memo, useEffect, useRef } from "react";
import Head from "@/components/home/Head";
import Carousel from "@/components/home/Carousel";
import Options from "@/components/home/Options";
import { ExitApp } from "@/utils/exitAPP";
import { Log } from "@/utils/logger";
import { LinearGradient } from "expo-linear-gradient";

import { useGetTaskListAsync } from "@/utils/getTaskListAsync";


const Home = () => {
  const navigation = useNavigation();
  const isFirst = useRef(0);
  const GetTaskList = useGetTaskListAsync();
  useFocusEffect(ExitApp(navigation));
  useEffect(() => {
    if (isFirst.current === 0) {
      GetTaskList();
      isFirst.current++;
    }
  }, [GetTaskList]);
  Log.Console("HomeShow.");
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
      <ScrollView className="flex-1" style={{ backgroundColor: "transparent" }}>
        <Head />
        <LinearGradient
          colors={["#dfe9f3", "#dfe9f3", "#ffffff"]}
          style={{ flex: 1, borderRadius: 18, top: -15 }}
          end={{ x: 0, y: 0 }}
          start={{ x: 1, y: 1 }}
        >
          <View
            className="flex-1 "
            style={{ position: "relative" }}
          >
            <Carousel />
            <Options />
          </View>
        </LinearGradient>
      </ScrollView>
    </>
  );
};
// noinspection JSUnusedGlobalSymbols
export default memo(Home);
