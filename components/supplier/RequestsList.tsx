import { View, Text } from "react-native";
import React from "react";
import useLanguageStore from "@/stores/useLanguageStore";
import useAccountStore from "@/stores/useAccountStore";

const RequestsList = () => {
  const { language } = useLanguageStore();
  const { account } = useAccountStore();

  const translations = {
    en: {
      title: "No Requests Available",
      subtitle:
        "There are currently no requests to display. Please check back later.",
    },
    fr: {
      title: "Aucune demande disponible",
      subtitle:
        "Il n'y a actuellement aucune demande à afficher. Veuillez revenir plus tard.",
    },
    ar: {
      title: "لا توجد طلبات متاحة",
      subtitle: "لا توجد حاليًا طلبات للعرض. يرجى التحقق مرة أخرى لاحقًا.",
    },
  };

  if (!language) return null;
  const { title, subtitle } = translations[language?.id] || translations.en;

  return (
    <View className="px-6 bg-white h-full justify-center items-center">
      <Text className="font-kufi-semi-bold text-lg text-center">{title}</Text>
      <Text className="text-neutral-400 text-center font-kufi">{subtitle}</Text>
    </View>
  );
};

export default RequestsList;
