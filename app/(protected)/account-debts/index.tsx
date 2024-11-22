import { View, Text, FlatList, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import PageLayout from "@/components/ui/PageLayout";
import PageHeader from "@/components/ui/PageHeader";
import useLanguageStore from "@/stores/useLanguageStore";
import useAccountStore from "@/stores/useAccountStore";
import { StoreType } from "@/types";
import { getAccountStores, getStores } from "@/actions/store";
import StoreItem from "@/components/store/StoreItem";
import EmptyList from "@/components/ui/EmptyList";

const AccountDebtsScreen = () => {
  const [stors, setStors] = useState<StoreType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { language } = useLanguageStore();
  const { account } = useAccountStore();
  useEffect(() => {
    const fetchStors = async () => {
      if (account) {
        try {
          const data = await getAccountStores(account.id, 25);
          if (!data) return;
          setStors(data);
        } catch (error) {
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchStors();
  }, [account]);

  return (
    <View className="px-4 bg-neutral-100 h-full w-full">
      {isLoading ? (
        <View className="w-full h-full justify-center items-center">
          <ActivityIndicator size={"large"} color={"#059669"} />
        </View>
      ) : (
        <FlatList
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          className="h-full"
          contentContainerStyle={{
            rowGap: 10,
            padding: 5,
            justifyContent: "flex-start",
          }}
          columnWrapperStyle={{ gap: 10 }}
          data={stors}
          keyExtractor={(item) => item.id}
          renderItem={(item) => (
            <View className="w-[48%]">
              <StoreItem store={item.item} />
            </View>
          )}
          ListEmptyComponent={() => (
            <EmptyList
              title={
                language?.id === "en"
                  ? "No Stores Available"
                  : language?.id === "fr"
                  ? "Aucun magasin disponible"
                  : "لا توجد متاجر متاحة"
              }
              subText={
                language?.id === "en"
                  ? "You have no store records at the moment."
                  : language?.id === "fr"
                  ? "Vous n'avez aucun enregistrement de magasin pour le moment."
                  : "لا توجد سجلات متاجر في الوقت الحالي."
              }
            />
          )}
        />
      )}
    </View>
  );
};

export default AccountDebtsScreen;
