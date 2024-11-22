import { View, Text, ScrollView } from "react-native";
import React from "react";
import PageLayout from "../ui/PageLayout";
import StoreHeader from "./StoreHeader";
import StoreHero from "./StoreHero";
import StoreNavigations from "./StoreNavigations";
import LastDebtsCard from "../debts/LastDebtsCard";
import LastPaymentsCard from "../payments/LastPaymentsCard";

const StoreDetails = ({ id }: { id: string }) => {
  return (
    <ScrollView
      className="space-y-4 px-4 bg-neutral-100"
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    >
      <StoreHeader id={id} />
      <StoreHero id={id as string} />
      <View>
        <StoreNavigations id={id as string} />
      </View>
      <View>
        <LastDebtsCard id={id as string} />
      </View>

      <View>
        <LastPaymentsCard id={id as string} />
      </View>
    </ScrollView>
  );
};

export default StoreDetails;
