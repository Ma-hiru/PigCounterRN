import { RefreshControl, ScrollView, StatusBar, StyleSheet } from "react-native";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import Head from "@/components/home/Head";
import Carousel from "@/components/home/Carousel";
import Options from "@/components/home/Options";
import { LinearGradient } from "expo-linear-gradient";
import { useGetTaskListAsync } from "@/utils/getTaskListAsync";
import { useExitApp } from "@/hooks/useExitApp";
import { GlobalStyles } from "@/settings.theme";
import BottomTips from "@/components/BottomTips";

const Home = () => {
  const GetTaskListAsync = useGetTaskListAsync();
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    GetTaskListAsync().finally(() => {
      setRefreshing(false);
    });
  }, [GetTaskListAsync]);
  const refreshControl = useMemo(
    () => <RefreshControl
      refreshing={refreshing}
      onRefresh={onRefresh}
      tintColor={GlobalStyles.ThemeColor}
      colors={[GlobalStyles.ThemeColor1]}
    />,
    [onRefresh, refreshing]
  );
  useEffect(() => {
    GetTaskListAsync().then();
  }, [GetTaskListAsync]);
  useExitApp();
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
      <ScrollView refreshControl={refreshControl} className="flex-1" style={ScrollStyle}>
        <Head />
        <LinearGradient {...linear_gradient}>
          <Carousel />
          <Options />
          <BottomTips />
        </LinearGradient>
      </ScrollView>
    </>
  );
};
// noinspection JSUnusedGlobalSymbols
export default memo(Home);

const {
  ScrollStyle
} = StyleSheet.create({
  ScrollStyle: {
    backgroundColor: "#dfe9f3"
  }
} as const);

const linear_gradient = {
  colors: ["#dfe9f3", "#dfe9f3", "#ffffff"],
  style: { flex: 1, borderRadius: 18, top: -15 },
  end: { x: 0, y: 0 },
  start: { x: 1, y: 1 }
} as const;
