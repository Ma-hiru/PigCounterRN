import { FC } from "react";
import { Button, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRouter } from "expo-router";
import { ImagePickerAsset } from "expo-image-picker";

interface props {
  previewImg?: ImagePickerAsset;
  cachePath: { path: string; type: string },
  clearImg: () => Promise<void>,
  takeCamera: (mode: "image" | "video") => () => Promise<void>,
}

const UploadPagesOptionsCard: FC<props> = (
  {
    previewImg,
    cachePath,
    clearImg,
    takeCamera
  }) => {
  const router = useRouter();
  return (
    <>
      <Card>
        {
          (previewImg || cachePath.path) ?
            (
              <>
                <Button onPress={clearImg} className="mt-4" action="negative">
                  <ButtonText>重新选择</ButtonText>
                </Button>
                <Button onPress={router.back} className="mt-4" action="primary">
                  <ButtonText>暂时保存</ButtonText>
                </Button>
                <Button className="mt-4" action="positive">
                  <ButtonText>上传文件</ButtonText>
                </Button>
              </>
            ) :
            (
              <>
                <Button onPress={takeCamera("image")} className="mt-4">
                  <ButtonText>拍照上传</ButtonText>
                </Button>
                <Button onPress={takeCamera("video")} className="mt-4">
                  <ButtonText>录像上传</ButtonText>
                </Button>
                <Button onPress={takeCamera("image")} className="mt-4">
                  <ButtonText>本地选择</ButtonText>
                </Button>
              </>
            )
        }
      </Card>
    </>
  );
};
export default UploadPagesOptionsCard;
