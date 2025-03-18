import { FC, memo } from "react";
import { Modal, TouchableOpacity } from "react-native";
import { ImageSource, Image } from "expo-image";

interface props {
  source: ImageSource;
  isPreviewVisible: boolean;
  setPreviewVisible: (isPreviewVisible: boolean) => void;
}

const ImagePreview: FC<props> = ({ source, isPreviewVisible, setPreviewVisible }) => {
  return (
    <>
      <Modal visible={isPreviewVisible} transparent={true}>
        <TouchableOpacity
          style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.8)" }}
          onPress={() => setPreviewVisible(false)}
        >
          <Image
            source={source}
            style={{ flex: 1 }}
            contentFit="contain"
          />
        </TouchableOpacity>
      </Modal>
    </>
  );
};
export default memo(ImagePreview);
