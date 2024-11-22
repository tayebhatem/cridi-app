import { View, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { uploadImage } from "@/libs/appwrite";
import useAccountStore from "@/stores/useAccountStore";
import * as ImagePicker from "expo-image-picker";
import { useChatContext } from "stream-chat-expo";
import { Image } from "tamagui";

const Avatar = ({
  size,
  url,
  uplaod,
}: {
  size: "Small" | "Medium" | "Large";
  url: string | undefined;
  uplaod: boolean;
}) => {
  const [loading, setloading] = useState(false);
  const { account, setAvatar } = useAccountStore();
  const { client } = useChatContext();
  const pickImage = async () => {
    if (account) {
      try {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });

        if (!result.canceled) {
          setloading(true);
          const file = result.assets[0];

          const data = await uploadImage(file, account.id);
          const url = data?.toString();
          if (url) {
            setAvatar(url);
            client.upsertUser({ id: account.id, image: url });
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        setloading(false);
      }
    }
  };
  return (
    <TouchableOpacity
      onPress={pickImage}
      activeOpacity={0.8}
      disabled={uplaod || loading}
      className={`bg-white rounded-full overflow-hidden  flex items-center justify-center border border-neutral-200 dark:border-dark-200 ${
        loading && "opacity-50"
      } ${
        size === "Small"
          ? "w-12 h-12"
          : size === "Medium"
          ? "w-16 h-16"
          : "w-24 h-24"
      }`}
    >
      {loading ? (
        <View className="bg-neutral-200 w-full h-full  animate-pulse flex items-center justify-center">
          <ActivityIndicator size={"large"} color={"#059669"} />
        </View>
      ) : (
        <Image src={url} className="w-full h-full bg-white" />
      )}
    </TouchableOpacity>
  );
};

export default Avatar;
