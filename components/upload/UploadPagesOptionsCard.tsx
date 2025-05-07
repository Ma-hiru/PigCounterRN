import { FC, memo, useCallback, useMemo } from "react";
import { Button, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRouter } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import { GlobalStyles } from "@/settings";
import ModalWindow from "@/components/ModalWindow";
import { useMyState } from "@/hooks/useMyState";
import { Log } from "@/utils/logger";
import { View } from "react-native";
import { Input, InputField } from "@/components/ui/input";

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
  addArtifact: (res: number) => void;
  count: number;
  hasConfirm: boolean;
}

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
    count,
    hasConfirm
  }) => {
  const router = useRouter();
  const showModal = useMyState(false);
  const NoDataRender = useMemo(() => (
    <>
      <Button onPress={takeAssets("images", "take")} className="mt-4" variant="link"
              style={{ backgroundColor: GlobalStyles.ThemeColor1 }}>
        <Feather name="camera" color="white" />
        <ButtonText style={{ color: "white" }}>拍照上传</ButtonText>
      </Button>
      {/*<Button onPress={takeAssets("videos", "take")} className="mt-4" variant="link"*/}
      {/*        style={{ backgroundColor: GlobalStyles.ThemeColor1 }}>*/}
      {/*  <Feather name="video" color="white" />*/}
      {/*  <ButtonText style={{ color: "white" }}>录像上传</ButtonText>*/}
      {/*</Button>*/}
      <Button onPress={takeAssets("images", "pick")} className="mt-4" variant="link"
              style={{ backgroundColor: GlobalStyles.ThemeColor1 }}>
        <AntDesign name="picture" color="white" />
        <ButtonText style={{ color: "white" }}>本地图片</ButtonText>
      </Button>
      {/*<Button onPress={takeAssets("videos", "pick")} className="mt-4" variant="link"*/}
      {/*        style={{ backgroundColor: GlobalStyles.ThemeColor1 }}>*/}
      {/*  <Entypo name="folder-video" color="white" />*/}
      {/*  <ButtonText style={{ color: "white" }}>本地视频</ButtonText>*/}
      {/*</Button>*/}
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
      <Button disabled={hasConfirm} onPress={clearUpload} className="mt-4" action="negative">
        <ButtonText>重新上传</ButtonText>
      </Button>
      <Button disabled={hasConfirm} onPress={() => {
        showModal.set(true);
      }} className="mt-4" action="primary">
        <ButtonText>修改数据</ButtonText>
      </Button>
      <Button disabled={hasConfirm} onPress={confirmData} className="mt-4" action="positive">
        <ButtonText>{hasConfirm ? "已确认" : "确认数据"}</ButtonText>
      </Button>
      {
        hasConfirm &&
        <Button onPress={router.back} className="mt-4" action="positive">
          <ButtonText>返回</ButtonText>
        </Button>
      }
    </>
  ), [clearUpload, confirmData, hasConfirm, router, showModal]);
  const Render = useCallback(() => {
    if (previewVideo || previewImg || cachePath.path) {
      if (isUpload) return UploadDataRender;
      return PreViewDataRender;
    }
    return NoDataRender;
  }, [NoDataRender, PreViewDataRender, UploadDataRender, cachePath.path, isUpload, previewImg, previewVideo]);

  const inputNum = useMyState(0);
  const inputCount = (text: string) => {
    const num = Number.parseInt(text);
    if (Number.isNaN(num)) inputNum.set(0);
    else inputNum.set(num);
  };
  Log.Console("uploadOptionsShow", showModal.get());
  return (
    <>
      <ModalWindow
        title="修改数据"
        confirm={() => {
          addArtifact(inputNum.get());
        }} show={showModal}
      >
        <View>
          <Input>
            <InputField placeholder={String(count)} onChangeText={inputCount} />
          </Input>
        </View>
      </ModalWindow>
      <Card style={{ backgroundColor: "rgba(255,255,255,0.6)", marginTop: 15 }}>
        {Render()}
      </Card>
    </>
  );
};
export default memo(UploadPagesOptionsCard);

