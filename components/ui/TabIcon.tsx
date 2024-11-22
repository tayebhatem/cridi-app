import { View, Text } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";

const TabIcon = ({
  icon,
  color,
  focused,
  name,
  notification,
}: {
  icon: any;
  color: string;
  focused: boolean;
  name: string;
  notification: number | undefined;
}) => {
  return (
    <View className="flex items-center justify-center gap-y-1.5">
      <View>
        {notification !== undefined && notification > 0 && (
          <View className="absolute -top-2 -right-2 w-5 h-5 text-sm justify-center items-center bg-red-500 z-50 rounded-full">
            <Text className=" text-xs   text-center  text-white font-medium">
              {notification >= 100 ? "N" : notification}
            </Text>
          </View>
        )}
        <AntDesign name={icon} size={24} color={color} />
      </View>
      <Text
        className={`text-xs  capitalize font-kufi-medium ${
          focused ? "text-primary-500" : "text-neutral-400"
        } `}
      >
        {name}
      </Text>
    </View>
  );
};

export default TabIcon;
