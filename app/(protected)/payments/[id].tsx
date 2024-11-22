import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import PageHeader from "@/components/ui/PageHeader";
import PaymentsCard from "@/components/payments/PaymentsCard";
import PageLayout from "@/components/ui/PageLayout";
import useLanguageStore from "@/stores/useLanguageStore";

const PayementsScreen = () => {
  const { id } = useLocalSearchParams();
  const { language } = useLanguageStore();

  return (
    <View className="px-4">
      <PaymentsCard id={id as string} />
    </View>
  );
};

export default PayementsScreen;
