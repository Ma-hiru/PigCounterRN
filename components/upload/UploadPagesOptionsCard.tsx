import { FC, memo, useCallback, useMemo } from "react";
import { Button, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRouter } from "expo-router";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { Updater } from "use-immer";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import { GlobalStyles } from "@/settings";

interface props {
  previewImg?: RNFile;
  previewVideo?: RNFile;
  cachePath: { path: string; type: string };
  clearImg: () => Promise<void>;
  takeAssets: (mode: "images" | "videos", method: "take" | "pick") => () => Promise<void>;
  submitFile: () => Promise<void>;
  clearUpload: () => void;
  isUpload: boolean;
  confirmData: () => void;
  addArtifact: () => void;
  useCount: [count: count, setCount: setCount];
}

type count = {
  aiCount: number
  peopleCount: number
}
type setCount = Updater<count>;
const UploadPagesOptionsCard: FC<props> = (
  {
    previewImg,
    previewVideo,
    cachePath,
    clearImg,
    takeAssets,
    submitFile,
    clearUpload,
    isUpload,
    confirmData,
    addArtifact,
    useCount
  }) => {
  const [count, setCount] = useCount;
  const router = useRouter();
  const NoDataRender = useMemo(() => (
    <>
      <Button onPress={takeAssets("images", "take")} className="mt-4" variant="link"
              style={{ backgroundColor: GlobalStyles.ThemeColor1 }}>
        <Feather name="camera" color="white" />
        <ButtonText style={{ color: "white" }}>拍照上传</ButtonText>
      </Button>
      <Button onPress={takeAssets("videos", "take")} className="mt-4" variant="link"
              style={{ backgroundColor: GlobalStyles.ThemeColor1 }}>
        <Feather name="video" color="white" />
        <ButtonText style={{ color: "white" }}>录像上传</ButtonText>
      </Button>
      <Button onPress={takeAssets("images", "pick")} className="mt-4" variant="link"
              style={{ backgroundColor: GlobalStyles.ThemeColor1 }}>
        <AntDesign name="picture" color="white" />
        <ButtonText style={{ color: "white" }}>本地图片</ButtonText>
      </Button>
      <Button onPress={takeAssets("videos", "pick")} className="mt-4" variant="link"
              style={{ backgroundColor: GlobalStyles.ThemeColor1 }}>
        <Entypo name="folder-video" color="white" />
        <ButtonText style={{ color: "white" }}>本地视频</ButtonText>
      </Button>
    </>
  ), [takeAssets]);
  const PreViewDataRender = useMemo(() => (
    <>
      <Button onPress={clearImg} className="mt-4" action="negative">
        <ButtonText>重新选择</ButtonText>
      </Button>
      <Button onPress={router.back} className="mt-4" action="primary">
        <ButtonText>暂时保存</ButtonText>
      </Button>
      <Button onPress={submitFile} className="mt-4" action="positive">
        <ButtonText>上传文件</ButtonText>
      </Button>
    </>
  ), [clearImg, router.back, submitFile]);
  const UploadDataRender = useMemo(() => (
    <>
      <Button onPress={clearUpload} className="mt-4" action="negative">
        <ButtonText>重新上传</ButtonText>
      </Button>
      <Button onPress={addArtifact} className="mt-4" action="primary">
        <ButtonText>修改数据</ButtonText>
      </Button>
      <Button onPress={confirmData} className="mt-4" action="positive">
        <ButtonText>确认</ButtonText>
      </Button>
    </>
  ), [addArtifact, clearUpload, confirmData]);
  const Render = useCallback(() => {
    if (previewVideo || previewImg || cachePath.path) {
      if (isUpload) return UploadDataRender;
      return PreViewDataRender;
    }
    return NoDataRender;
  }, [NoDataRender, PreViewDataRender, UploadDataRender, cachePath.path, isUpload, previewImg, previewVideo]);
  const inputCount = (text: string) => {
    const num = Number.parseInt(text);
    if (Number.isNaN(num))
      setCount((draft) => {
        draft.peopleCount = 0;
      });
    else setCount((draft) => {
      draft.peopleCount = num;
    });
  };
  return (
    <>
      <Card style={{ backgroundColor: "rgba(255,255,255,0.6)", marginTop: 15 }}>
        {/*{isUpload &&*/}
        {/*  (*/}
        {/*    <View className="w-full flex-col justify-center items-center mb-4">*/}
        {/*      <Text className="font-bold text-2xl">*/}
        {/*        识别数量:*/}
        {/*        <Text style={styles.CountText} className="text-2xl">{" " + count.aiCount}</Text>*/}
        {/*      </Text>*/}
        {/*      <View className="flex-row justify-center items-center">*/}
        {/*        <Text className="font-bold text-2xl h-auto">*/}
        {/*          人工计数:*/}
        {/*        </Text>*/}
        {/*        <TextInput*/}
        {/*          value={String(count.peopleCount)}*/}
        {/*          style={{ height: "auto", width: "auto" }}*/}
        {/*          className="text-2xl text-[red]"*/}
        {/*          onChangeText={inputCount}*/}
        {/*        />*/}
        {/*      </View>*/}
        {/*    </View>*/}
        {/*  )*/}
        {/*}*/}
        {Render()}
      </Card>
    </>
  );
};
export default memo(UploadPagesOptionsCard);
const styles = StyleSheet.create({
  CountText: {
    color: "red"
  }
});
