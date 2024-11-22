import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import React from "react";
import useLanguageStore from "@/stores/useLanguageStore";
import { router } from "expo-router";
import { Card } from "tamagui";

const Navigations = () => {
  const { language } = useLanguageStore();
  const navData = [
    {
      name: {
        en: "stores",
        fr: "magasins",
        ar: "محلات",
      },
      image: require("@/assets/images/dashboard/store.png"),
      link: "/stores",
    },
    {
      name: {
        en: "debts",
        fr: "crédits",
        ar: "ديون",
      },
      image: require("@/assets/images/dashboard/debts.png"),
      link: "/account-debts",
    },
    {
      name: {
        en: "products",
        fr: "produits",
        ar: "منتوجات",
      },
      image: require("@/assets/images/dashboard/product.png"),
      link: "/product",
    },
    {
      name: {
        en: "publications",
        fr: "publications",
        ar: "منشورات",
      },
      image: require("@/assets/images/dashboard/post.png"),
      link: "/posts",
    },
  ];
  return (
    <View>
      <FlatList
        data={navData}
        contentContainerStyle={{ gap: 0 }}
        horizontal
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        renderItem={(item) => (
          <View className="items-center justify-center  space-y-3 px-3 ">
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => router.push(`../${item.item.link}`)}
            >
              <Card
                elevationAndroid={1}
                className="bg-primary-100 p-3 justify-center items-center "
              >
                <Image
                  source={item.item.image}
                  resizeMode="contain"
                  className="w-10 h-10"
                />
              </Card>
            </TouchableOpacity>
            <Text className="text-xs capitalize font-kufi-medium ">
              {language?.id === "en"
                ? item.item.name.en
                : language?.id === "fr"
                ? item.item.name.fr
                : item.item.name.ar}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default Navigations;
