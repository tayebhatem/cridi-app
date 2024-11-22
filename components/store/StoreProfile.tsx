import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AccountUserType, StoreType } from "@/types";
import { getAccountStore, getStore } from "@/actions/store";
import Avatar from "../ui/Avatar";
import { AntDesign, Entypo, MaterialIcons } from "@expo/vector-icons";
import CardLayout from "../ui/CardLayout";
import PageLayout from "../ui/PageLayout";
import useAccountStore from "@/stores/useAccountStore";
import Loader from "../ui/Loader";
import { createRequest, deleteRequest } from "@/libs/appwrite";
import { useChatContext } from "stream-chat-expo";
import { router } from "expo-router";
import useLanguageStore from "@/stores/useLanguageStore";
import { Plus, Check, MessageCircleMore } from "@tamagui/lucide-icons";
import { Button, Card } from "tamagui";
import useStore from "@/stores/useStore";
const StoreProfile = ({ id }: { id: string }) => {
  const { setStore, store } = useStore();
  const [accountUser, setAccountUser] = useState<
    AccountUserType | null | undefined
  >();
  const { language } = useLanguageStore();
  const [isLoading, setisLoading] = useState(true);
  const { account } = useAccountStore();
  const { client } = useChatContext();

  const startChat = async () => {
    try {
      if (account && store) {
        const channel = client.channel("messaging", {
          members: [account?.id, store?.id],
        });
        await channel.watch();

        router.push(`../conversation/${channel.cid}`);
      }
    } catch (error) {}
  };

  const sendRequest = async () => {
    if (id && account) {
      try {
        const data = await createRequest(account, id);
        if (data) setAccountUser(data);
      } catch (error) {}
    }
  };

  const cancelRequest = async () => {
    if (accountUser) {
      try {
        await deleteRequest(accountUser?.id);
        setAccountUser(null);
      } catch (error) {}
    }
  };

  useEffect(() => {
    if (account && id) {
      const fetchStore = async () => {
        try {
          const data = await getStore(id);
          if (data) setStore(data);
        } catch (error) {}
      };
      const fetchAccountUser = async () => {
        try {
          const data = await getAccountStore(account.id, id);
          if (data) setAccountUser(data);
        } catch (error) {
        } finally {
          setisLoading(false);
        }
      };
      fetchStore();
      fetchAccountUser();
    }
  }, [id]);

  if (isLoading) return <Loader />;

  return (
    <View className="p-4  h-full bg-neutral-100">
      <CardLayout elevationAndroid={1}>
        <View className="space-y-4">
          <View className="flex flex-row items-center">
            <Avatar size="Medium" uplaod={false} url={store?.avatar} />
            <View>
              <Text className="text-lg font-medium">{store?.name}</Text>
              <View className="flex flex-row items-center space-x-1">
                <MaterialIcons
                  name="location-pin"
                  color={"#A3A3A3"}
                  size={16}
                />
                <Text className="text-neutral-400 text-sm">
                  {store?.adress}
                </Text>
              </View>
              <View className="flex flex-row items-center space-x-1">
                <MaterialIcons name="phone" color={"#A3A3A3"} size={16} />
                <Text className="text-neutral-400 text-sm">{store?.phone}</Text>
              </View>
            </View>
          </View>

          <View className="flex flex-row space-x-2">
            <View className="flex-1">
              <Button
                onPress={accountUser ? cancelRequest : sendRequest}
                className="bg-primary-500 text-white"
                size={"$5"}
                iconAfter={accountUser ? Check : Plus}
              >
                <Text className="text-white font-kufi-medium  leading-7">
                  {language?.id === "en"
                    ? accountUser
                      ? "Cancel"
                      : "Add"
                    : language?.id === "fr"
                    ? accountUser
                      ? "Annuler"
                      : "Ajouter"
                    : accountUser
                    ? "إلغاء"
                    : "أضف"}
                </Text>
              </Button>
            </View>
            <View className="flex-1">
              <Button
                onPress={startChat}
                size={"$5"}
                iconAfter={MessageCircleMore}
              >
                <Text className=" font-kufi-medium   leading-7">
                  {language?.id === "en"
                    ? "Contact"
                    : language?.id === "fr"
                    ? "Contacter"
                    : "تواصل"}
                </Text>
              </Button>
            </View>
          </View>
        </View>
      </CardLayout>
    </View>
  );
};

export default StoreProfile;
