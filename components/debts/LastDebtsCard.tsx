import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { Link } from "expo-router";
import { DebtsType } from "@/types";
import { getDebsts } from "@/actions/debts";
import { Ionicons } from "@expo/vector-icons";
import DebtItem from "./DebtItem";
import useLanguageStore from "@/stores/useLanguageStore";
import CardLayout from "../ui/CardLayout";
import { Card } from "tamagui";

const LastDebtsCard = ({ id }: { id: string }) => {
  const [lastDebts, setLastDebts] = useState<DebtsType[] | undefined>([]);
  const { language } = useLanguageStore();
  useEffect(() => {
    const fetchLastDebts = async () => {
      if (id) {
        try {
          const data = await getDebsts(id as string, 3);
          setLastDebts(data);
        } catch (error) {}
      }
    };
    fetchLastDebts();
  }, []);

  return (
    <View className="space-y-2">
      <View className="flex flex-row items-center justify-between">
        <Text className="font-kufi-medium text-black dark:text-white">
          {language?.id === "en"
            ? "Last debts"
            : language?.id === "fr"
            ? "Dernières crédits"
            : "آخر الديون"}
        </Text>
        <Link
          href={`../debts/${id}`}
          className="capitalize  font-kufi-medium text-primary-500 leading-6"
        >
          {language?.id === "en"
            ? "More"
            : language?.id === "fr"
            ? "Plus"
            : "المزيد"}
        </Link>
      </View>
      <View>
        {lastDebts && lastDebts.length > 0 ? (
          <CardLayout elevationAndroid={1}>
            {lastDebts.map((item) => (
              <DebtItem debt={item} key={item.id} />
            ))}
          </CardLayout>
        ) : (
          <CardLayout elevationAndroid={1}>
            <Text className="text-neutral-400 text-center w-full font-kufi ">
              {language?.id === "en"
                ? "No debts are found."
                : language?.id === "fr"
                ? "Aucune crédits n'est trouvée."
                : "لم يتم العثور على ديون."}
            </Text>
          </CardLayout>
        )}
      </View>
    </View>
  );
};

export default LastDebtsCard;
