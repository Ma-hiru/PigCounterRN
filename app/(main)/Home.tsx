import { ScrollView, StatusBar, View } from "react-native";
import { useFocusEffect, useNavigation } from "expo-router";
import { memo } from "react";
import Head from "@/components/home/Head";
import Carousel from "@/components/home/Carousel";
import Options from "@/components/home/Options";
import { ExitApp } from "@/utils/exitAPP";
import { Log } from "@/utils/logger";

const Home = () => {
  const navigation = useNavigation();
  useFocusEffect(ExitApp(navigation));
  Log.Console("HomeShow.");
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
      <ScrollView className="flex-1 bg-gray-50">
        <Head />
        <View
          className="flex-1 bg-gray-50"
          style={{ position: "relative", top: -20, borderRadius: 18 }}
        >
          <Carousel />
          <Options />
        </View>
      </ScrollView>
    </>
  );
};
// noinspection JSUnusedGlobalSymbols
export default memo(Home);
