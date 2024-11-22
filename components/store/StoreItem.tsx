import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { AccountUserType, StoreType } from "@/types";
import { useRouter } from "expo-router";
import Avatar from "../ui/Avatar";
import CardLayout from "../ui/CardLayout";
import { MaterialIcons } from "@expo/vector-icons";

const StoreItem = ({ store }: { store: StoreType }) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => router.push(`../store/${store.id}`)}
      className=""
    >
      <CardLayout elevationAndroid={1}>
        <View className="flex items-center">
          <Avatar size="Medium" url={store.avatar} uplaod />
          <View>
            <Text
              className="font-medium text-base text-clip text-black dark:text-white text-center"
              numberOfLines={1}
            >
              {store.name}
            </Text>
            <View>
              <View className="h-5  items-center justify-center">
                {store.adress && (
                  <View className="flex flex-row justify-center items-center space-x-1">
                    <MaterialIcons
                      name="location-pin"
                      color={"#A3A3A3"}
                      size={14}
                    />
                    <Text className="text-neutral-500 text-xs">
                      {store.adress}
                    </Text>
                  </View>
                )}
              </View>

              <View className="h-5  items-center justify-center">
                {store.phone && (
                  <View className="flex flex-row justify-center items-center space-x-1">
                    <MaterialIcons name="phone" color={"#A3A3A3"} size={14} />
                    <Text className="text-neutral-500 text-xs">
                      {store.phone}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </View>
        </View>
      </CardLayout>
    </TouchableOpacity>
  );
};

export default StoreItem;
