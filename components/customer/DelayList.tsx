import { View, Text } from "react-native";
import React from "react";
import useLanguageStore from "@/stores/useLanguageStore";
import useAccountStore from "@/stores/useAccountStore";

const DelayList = () => {
  const { language } = useLanguageStore();
  const { account } = useAccountStore();

  const translations = {
    en: {
      title: "No Delays",
      subtitle:
        "There are currently no delays to display. Please check back later.",
    },
    fr: {
      title: "Aucun retard",
      subtitle:
        "Il n'y a actuellement aucun retard à afficher. Veuillez revenir plus tard.",
    },
    ar: {
      title: "لا توجد تأخيرات",
      subtitle: "لا توجد حاليًا تأخيرات للعرض. يرجى التحقق مرة أخرى لاحقًا.",
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

export default DelayList;
