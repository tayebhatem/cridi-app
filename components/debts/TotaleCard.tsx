import { View, Text } from "react-native";
import React from "react";
import { Card } from "tamagui";
import {
  Currency,
  DollarSign,
  File,
  FileText,
  Receipt,
  ReceiptEuro,
  ReceiptText,
} from "@tamagui/lucide-icons";
import CardLayout from "../ui/CardLayout";

const TotaleCard = ({
  total,
  subText,
}: {
  total: number | undefined;
  subText: string;
}) => {
  const totalString = new Intl.NumberFormat("fr-FR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(total as number);
  return (
    <Card
      elevationAndroid={1}
      className="p-4 flex flex-row items-center space-x-4 bg-white "
    >
      <View className="bg-primary-100 p-3 rounded-full">
        <FileText className="text-primary-500" color={"#059669"} />
      </View>
      <View>
        <Text className="text-2xl  font-medium">{totalString} DA</Text>
        <Text className="text-neutral-400 text-left font-kufi">{subText}</Text>
      </View>
    </Card>
  );
};

export default TotaleCard;
