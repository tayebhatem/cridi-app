import { View, Text } from "react-native";
import React from "react";
import { DebtsType } from "@/types";
import { Avatar } from "tamagui";

const DebtItem = ({ debt }: { debt: DebtsType }) => {
  const amount = new Intl.NumberFormat("fr-FR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(debt.amount as number);
  return (
    <View
      key={debt.id}
      className="flex flex-row justify-between py-2  space-y-2  "
    >
      <View className="flex flex-row">
        <Avatar circular size="$4" className="border border-neutral-200">
          <Avatar.Image accessibilityLabel="Cam" src={debt.storeImage} />
          <Avatar.Fallback backgroundColor="$white0" />
        </Avatar>
        <View>
          <Text className="font-medium text-base">{debt.storeName}</Text>
          <View className="flex flex-row items-center space-x-2">
            <Text className="text-neutral-400 text-xs">{debt.date}</Text>

            <Text className="text-neutral-400 text-xs">{debt.time}</Text>
          </View>
        </View>
      </View>
      <View className="">
        <Text className="text-base font-medium leading-8 text-black dark:text-white">
          {amount} DA
        </Text>
      </View>
    </View>
  );
};

export default DebtItem;
