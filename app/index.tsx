import { View, Text, Image } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { Redirect, useRouter } from "expo-router";
import { useSession } from "@/hooks/useSession";
import Loader from "@/components/ui/Loader";
import useLanguageStore from "@/stores/useLanguageStore";
import { states, supplierFields } from "@/constants/supplier";
import useAccountStore from "@/stores/useAccountStore";
import { Button } from "tamagui";

const OnboardingScreen = () => {
  const router = useRouter();
  const { session, isLoading } = useSession();
  const { language } = useLanguageStore();
  const { setAccount, setSupplier } = useAccountStore();

  useEffect(() => {
    if (session) {
      setAccount({
        id: session.account.$id,
        name: session.account.name,
        username: session.account.username,
        email: session.account.email,
        type: session.account.type,
        avatar: session.account.avatar,
        phone: session.account.phone,
        verified: session.account.verified,
      });
      if (session.account.supplier) {
        setSupplier({
          id: session.account.supplier.$id,
          description: session.account.supplier.description,
          field:
            supplierFields.find(
              (item) => item.id === session.account.supplier.field
            ) || supplierFields[0],
          state:
            states.find((item) => item.id === session.account.supplier.state) ||
            states[0],
        });
      }
    }
  }, [session]);

  if (isLoading) return <Loader />;
  if (session) {
    if (!session.account.email) {
      return <Redirect href={"/auth/send-account-otp"} />;
    } else if (!session.account.verified) {
      return <Redirect href={"/auth/verify-account-otp"} />;
    } else if (session.account.type === "NONE") {
      return <Redirect href={"/user-type"} />;
    } else if (
      session.account.type === "SUPPLIER" &&
      !session.account.supplier
    ) {
      return <Redirect href={"/supplier"} />;
    } else {
      return <Redirect href={"/dashboard"} />;
    }
  }

  return (
    <SafeAreaView className="p-4 flex justify-end items-center space-y-4   bg-white h-full">
      <Image
        source={require("../assets/images/onboarding.png")}
        resizeMode="cover"
        className="w-64 h-64 my-4"
      />
      <View className="w-full">
        <Text className="text-2xl font-kufi-semi-bold  w-full ">
          {language?.id === "en"
            ? "Find stores and track your payments"
            : language?.id === "fr"
            ? "Trouvez des magasins et suivez vos paiements"
            : "ابحث عن المتاجر وتتبع مدفوعاتك"}
        </Text>
        <Text className="text-neutral-400 font-kufi leading-6">
          {language?.id === "en"
            ? "Log in to find stores, manage payments, and track your balances."
            : language?.id === "fr"
            ? "Connectez-vous pour trouver des magasins, gérer les paiements et suivre vos soldes."
            : "سجّل الدخول للبحث عن المتاجر، إدارة المدفوعات، وتتبع أرصدتك."}
        </Text>
      </View>
      <View className="w-full">
        <Button
          onPress={() => router.push("./auth/sign-in")}
          className="bg-primary-500 text-white"
          size={"$6"}
        >
          <Text className="text-white font-kufi-medium ">
            {language?.id === "en"
              ? "Start Now"
              : language?.id === "fr"
              ? "Commence Maintenant"
              : "إبدأ الآن"}
          </Text>
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default OnboardingScreen;
