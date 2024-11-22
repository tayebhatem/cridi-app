import { View, ScrollView } from "react-native";
import React from "react";
import Header from "@/components/dashboard/Header";
import Hero from "@/components/dashboard/Hero";
import PageLayout from "@/components/ui/PageLayout";
import LastStoresCard from "@/components/store/LastStoresCard";
import Navigations from "@/components/dashboard/Navigations";
import { SafeAreaView } from "react-native-safe-area-context";
const HomeScreen = () => {
  return (
    <SafeAreaView className="p-4 bg-neutral-100 h-full w-full">
      <Header />
      <ScrollView
        className="space-y-4"
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <Hero />
        <View>
          <Navigations />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
