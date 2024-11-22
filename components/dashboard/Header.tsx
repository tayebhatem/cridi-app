import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import useAccountStore from "@/stores/useAccountStore";
import Avatar from "../ui/Avatar";
import useLanguageStore from "@/stores/useLanguageStore";
import { Link, router } from "expo-router";
import { Bell } from "@tamagui/lucide-icons";
import useNotificationsStore from "@/stores/useNotificationsStore";

const Header = () => {
  const { account } = useAccountStore();
  const { language } = useLanguageStore();
  const { unreadNotificationsCount } = useNotificationsStore();
  return (
    <View className="flex flex-row justify-between items-center">
      <Pressable className="relative" onPress={() => router.push("../alert")}>
        <Bell size={28} className="w-7 h-7" />

        {unreadNotificationsCount > 0 && (
          <View className="bg-blue-500  w-3 h-3 rounded-full absolute right-0 border border-white "></View>
        )}
      </Pressable>
      <View className="flex flex-row space-x-2 ">
        <View className="text-left">
          <Text className="text-sm text-neutral-400 font-kufi leading-6">
            {language?.id === "en"
              ? "Welcome back"
              : language?.id === "fr"
              ? "Bon retour"
              : "مرحباً بعودتك"}
            👋
          </Text>
          <Text className="text-base text-black dark:text-white  font-kufi-semi-bold capitalize">
            {account?.name}
          </Text>
        </View>
        <Link href={"/account"}>
          <Avatar size="Small" url={account?.avatar} uplaod />
        </Link>
      </View>
    </View>
  );
};

export default Header;
