import { View, Text } from "react-native";
import React from "react";
import { DebtsType, PaymentsType } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import useLanguageStore from "@/stores/useLanguageStore";
import { Avatar } from "tamagui";

const PaymentItem = ({ payment }: { payment: PaymentsType }) => {
  const amount = new Intl.NumberFormat("fr-FR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(payment.amount as number);

  const newAmount = new Intl.NumberFormat("fr-FR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(payment.newAmount as number);
  return (
    <View
      key={payment.id}
      className="flex flex-row justify-between items-center py-2  space-y-2  "
    >
      <View className="flex flex-row">
        <Avatar circular size="$4" className="border border-neutral-200">
          <Avatar.Image accessibilityLabel="Cam" src={payment.storeImage} />
          <Avatar.Fallback backgroundColor="$blue5" />
        </Avatar>
        <View>
          <Text className="font-medium text-base">{payment.storeName}</Text>
          <View className="flex flex-row items-center space-x-2">
            <Text className="text-neutral-400 text-xs">{payment.date}</Text>

            <Text className="text-neutral-400 text-xs">{payment.time}</Text>
          </View>
        </View>
      </View>
      <View className="">
        <Text className="text-base font-medium  text-black dark:text-white">
          {amount} DA
        </Text>
        <Text className="text-red-500 text-xs font-medium">
          + {newAmount} DA
        </Text>
      </View>
    </View>
  );
};

export default PaymentItem;
