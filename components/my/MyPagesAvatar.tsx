import checkIcon from "@/assets/images/my/check.svg";
import defaultAvatar from "@/assets/images/logo_1.jpg";
import headBg from "@/assets/images/my/user_bg01.png";
import { useLogin } from "@/hooks/useLogin";
import { baseUrl, DEFAULT_MY_BG_SCALE } from "@/settings";
import { userSelector } from "@/stores";
import { setImageScale } from "@/utils/setImageScale";
import { Image } from "expo-image";
import { FC, memo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import logger from "@/utils/logger";
import { handleAvatarURL } from "@/utils/handleServerURL";


type props = object

const MyPagesAvatar: FC<props> = () => {
  const [bgScale, setBgScale] = useState(DEFAULT_MY_BG_SCALE);
  const { hasToken, handleLogin } = useLogin();
  const { profile } = useSelector(userSelector);
  const username = profile.name ? profile.name : "点击登录";

  const avatar = profile.profilePicture ? handleAvatarURL(profile.profilePicture) : defaultAvatar;
  logger("console", "avatar", avatar);
  const organization = profile.organization;
  const handleAvatarPress = () => {
    if (!hasToken) {
      handleLogin();
    }
  };
  return (
    <>
      <View style={{ position: "relative" }}>
        <Image source={headBg}
               style={{ ...styles.UserBg, aspectRatio: bgScale }}
               onLoad={setImageScale(bgScale, setBgScale)}
               contentFit="contain"
        />
        <Pressable
          className="flex justify-center items-center w-screen -translate-x-1/2  -translate-y-1/2"
          style={styles.UserBox}
          onPress={handleAvatarPress}
        >
          <Image source={avatar}
                 style={styles.UserAvatar}
                 contentFit="cover"
          />
          <Text style={styles.UserNameText}>
            {username}
          </Text>
          <View className="w-full flex justify-center items-center flex-row mt-1">
            {organization && <Image source={checkIcon} style={styles.CheckIcon} />}
            <Text style={styles.UserInfoText}>
              {organization}
            </Text>
          </View>
        </Pressable>
      </View>
    </>
  );
};
export default memo(MyPagesAvatar);
const styles = StyleSheet.create({
  UserBg: {
    // width: "100%",
  },
  UserAvatar: {
    width: 65,
    height: 65,
    borderRadius: 99999,
    borderWidth: 2,
    borderColor: "#fff",
    overflow: "hidden"
  },
  UserBox: {
    position: "absolute",
    top: "50%",
    left: "50%"
  },
  UserNameText: {
    fontWeight: "600",
    marginTop: 10,
    fontSize: 18,
    color: "#ffffff"
  },
  UserInfoText: {
    fontSize: 14,
    lineHeight: 20,
    color: "#fff",
    marginLeft: 2
  },
  CheckIcon: {
    width: 15,
    height: 15
  }
});
