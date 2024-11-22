import {
  View,
  Text,
  Image,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { getStoreByAccount } from "@/actions/store";
import { useRouter } from "expo-router";
import Avatar from "../ui/Avatar";
import useStore from "@/stores/useStore";
import { Button, Card } from "tamagui";
import { UserCheck, MessageCircleMore } from "@tamagui/lucide-icons";
import useLanguageStore from "@/stores/useLanguageStore";
import { useChatContext } from "stream-chat-expo";
import useAccountStore from "@/stores/useAccountStore";

const StoreHeader = ({ id }: { id: string }) => {
  const router = useRouter();
  const { setStore, store } = useStore();
  const theme = useColorScheme();
  const { language } = useLanguageStore();
  const { client } = useChatContext();
  const { account } = useAccountStore();

  const startChat = async () => {
    try {
      if (account && store) {
        const channel = client.channel("messaging", {
          members: [account?.id, store?.id],
        });
        await channel.watch();

        router.push(`../conversation/${channel.cid}`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const fetchStore = async () => {
      if (id) {
        try {
          const data = await getStoreByAccount(id as string);
          if (!data) return;
          setStore(data);
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchStore();
  }, [id]);
  if (!store) return null;
  return (
    <Card elevationAndroid={1} className="p-4 space-y-4 bg-white my-4  ">
      <View className="flex flex-row items-center gap-x-2 ">
        <Avatar size="Medium" url={store.avatar} uplaod />
        <View>
          <Text className="text-lg font-medium text-black dark:text-white">
            {store.name}
          </Text>

          <View className="flex flex-row items-center space-x-1">
            <MaterialIcons name="location-pin" color={"#A3A3A3"} size={14} />
            <Text className="text-neutral-500 text-xs">{store.adress}</Text>
          </View>

          <View className="flex flex-row items-center space-x-1">
            <MaterialIcons name="phone" color={"#A3A3A3"} size={14} />
            <Text className="text-neutral-500 text-xs">{store.phone}</Text>
          </View>
        </View>
      </View>
      <View className="flex flex-row items-center space-x-2 w-full">
        <Button
          iconAfter={MessageCircleMore}
          size={"$5"}
          className="flex-1"
          onPress={startChat}
        >
          <Text className="font-kufi-medium">
            {language?.id === "en"
              ? "Message"
              : language?.id === "fr"
              ? "Message"
              : "رسالة"}
          </Text>
        </Button>
        <Button iconAfter={UserCheck} size={"$5"}></Button>
      </View>
    </Card>
  );
};

export default StoreHeader;
