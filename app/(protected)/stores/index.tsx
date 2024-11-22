import { View, Text, FlatList, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import useLanguageStore from "@/stores/useLanguageStore";
import useAccountStore from "@/stores/useAccountStore";
import { StoreType } from "@/types";
import { getStores } from "@/actions/store";
import StoreItem from "@/components/store/StoreItem";
import SearchInput from "@/components/ui/SearchInput";
import { Card, Spinner } from "tamagui";
import { Skeleton } from "moti/skeleton";
import CardLayout from "@/components/ui/CardLayout";
import StoreSkeleton from "@/components/store/StoreSkeleton";
const StoresScreen = () => {
  const { language } = useLanguageStore();
  const skeletonData = Array.from({ length: 4 }, (_, index) => ({
    id: index.toString(),
  }));
  const [stors, setStors] = useState<StoreType[]>([]);
  const [data, setData] = useState<StoreType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { account } = useAccountStore();
  useEffect(() => {
    const fetchStors = async () => {
      if (account) {
        try {
          const data = await getStores();
          if (!data) return;
          setStors(data);
          setData(data);
        } catch (error) {
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchStors();
  }, [account]);
  const handleSearch = (text: string) => {
    if (text === "") {
      setStors(data);
    } else {
      const filterData = data.filter((item) =>
        item.name.toLocaleLowerCase().includes(text.toLocaleLowerCase())
      );
      setStors(filterData);
    } // Update filtered data
  };

  return (
    <View className="px-4 bg-neutral-100 space-y-4">
      <View>
        <SearchInput onChange={handleSearch} />
      </View>
      <View>
        {isLoading ? (
          <View className="h-full w-full flex justify-center items-center">
            <Spinner size="large" />
          </View>
        ) : (
          <FlatList
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            className=""
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
          />
        )}
      </View>
    </View>
  );
};

export default StoresScreen;
