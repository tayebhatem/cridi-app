import { View, Text } from "react-native";
import React from "react";
import useLanguageStore from "@/stores/useLanguageStore";

const ProductPage = () => {
  const { language } = useLanguageStore();
  if (!language) return null;
  const translations = {
    en: {
      title: "No Products Available",
      subtitle:
        "There are currently no products to display. Please check back later.",
    },
    fr: {
      title: "Aucun produit disponible",
      subtitle:
        "Il n'y a actuellement aucun produit à afficher. Veuillez revenir plus tard.",
    },
    ar: {
      title: "لا توجد منتجات متاحة",
      subtitle: "لا توجد حاليًا منتجات للعرض. يرجى التحقق مرة أخرى لاحقًا.",
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

export default ProductPage;
