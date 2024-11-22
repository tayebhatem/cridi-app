import { View, Text } from "react-native";
import React from "react";
import useLanguageStore from "@/stores/useLanguageStore";

const PostsPage = () => {
  const { language } = useLanguageStore();
  if (!language) return null;

  const translations = {
    en: {
      title: "No Publications Available", // Updated title
      subtitle:
        "There are currently no publications to display. Please check back later.", // Updated subtitle
    },
    fr: {
      title: "Aucune publication disponible", // Updated title
      subtitle:
        "Il n'y a actuellement aucune publication à afficher. Veuillez revenir plus tard.", // Updated subtitle
    },
    ar: {
      title: "لا توجد منشورات متاحة", // Updated title
      subtitle: "لا توجد حاليًا منشورات للعرض. يرجى التحقق مرة أخرى لاحقًا.", // Updated subtitle
    },
  };

  const { title, subtitle } = translations[language?.id] || translations.en;

  return (
    <View className="px-6 bg-white h-full justify-center items-center4">
      <Text className="font-kufi-semi-bold text-lg text-center">{title}</Text>
      <Text className="text-neutral-400 text-center font-kufi">{subtitle}</Text>
    </View>
  );
};

export default PostsPage;
