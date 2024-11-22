import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { PaymentsType } from "@/types";
import { getPayments } from "@/actions/payments";
import { Link } from "expo-router";
import useLanguageStore from "@/stores/useLanguageStore";
import CardLayout from "../ui/CardLayout";
import PaymentItem from "./PaymentItem";
import { Card } from "tamagui";

const LastPaymentsCard = ({ id }: { id: string }) => {
  const [lastPayments, setLastPayments] = useState<PaymentsType[] | undefined>(
    []
  );
  const { language } = useLanguageStore();
  useEffect(() => {
    const fetchLastDebts = async () => {
      if (id) {
        try {
          const data = await getPayments(id as string, 3);
          setLastPayments(data);
        } catch (error) {}
      }
    };
    fetchLastDebts();
  }, []);

  return (
    <View className="space-y-2">
      <View className="flex flex-row items-center justify-between">
        <Text className="font-kufi-medium  text-black dark:text-white ">
          {language?.id === "en"
            ? "Last payments"
            : language?.id === "fr"
            ? "Derniers paiements"
            : "الدفعات الأخيرة"}
        </Text>
        <Link
          href={`../payments/${id}`}
          className="capitalize text-primary-500 font-kufi-medium "
        >
          {language?.id === "en"
            ? "More"
            : language?.id === "fr"
            ? "Plus"
            : "المزيد"}
        </Link>
      </View>
      <View>
        {lastPayments && lastPayments.length > 0 ? (
          <CardLayout elevationAndroid={1}>
            {lastPayments.map((item) => (
              <PaymentItem payment={item} key={item.id} />
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

export default LastPaymentsCard;
