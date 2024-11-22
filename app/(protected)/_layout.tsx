import React, { useEffect } from "react";
import { router, Stack } from "expo-router";
import SessionProvider from "@/providers/SessionProvider";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ChatProvider from "@/providers/ChatProvider";
import MessagesProvider from "@/providers/MessagesProvider";
import NotificationProvider from "@/providers/NotificationProvider";
import { Appearance, TouchableOpacity, View } from "react-native";
import { Linking } from "react-native";
import UserProvider from "@/providers/UserProvider";
import useLanguageStore from "@/stores/useLanguageStore";
import { BaggageClaim, ShoppingCart } from "@tamagui/lucide-icons";
import useStore from "@/stores/useStore";
const ProtectedLayout = () => {
  const { language } = useLanguageStore();
  const { store } = useStore();
  useEffect(() => {
    const handleOpenURL = (url: string) => {
      console.log(url);
    };

    const subscription = Linking.addEventListener("url", ({ url }) => {
      handleOpenURL(url);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    // Lock the appearance to 'dark' mode
    const lockDarkMode = () => {
      if (Appearance.getColorScheme() !== "light") {
        Appearance.setColorScheme("light");
      }
    };

    // Call the function initially and when the theme changes
    lockDarkMode();

    const appearanceListener = Appearance.addChangeListener(lockDarkMode);

    // Clean up the listener on component unmount
    return () => appearanceListener.remove();
  }, []);
  return (
    <GestureHandlerRootView>
      <SessionProvider>
        <UserProvider>
          <NotificationProvider>
            <MessagesProvider>
              <ChatProvider>
                <Stack>
                  <Stack.Screen
                    name="dashboard"
                    options={{ headerShown: false, animation: "default" }}
                  />
                  <Stack.Screen
                    name="store/[id]"
                    options={{
                      headerBackground: () => (
                        <View className="bg-neutral-100 w-full h-full"></View>
                      ),
                      headerShadowVisible: false,
                      headerTitleStyle: { fontSize: 16 },

                      headerTitle: store?.name,
                      animation: "slide_from_right",
                    }}
                  />
                  <Stack.Screen
                    name="stores/index"
                    options={{
                      headerTitleStyle: { fontFamily: "Kufi-Medium" },
                      headerBackground: () => (
                        <View className="bg-neutral-100 w-full h-full"></View>
                      ),
                      headerTitle:
                        language?.id === "en"
                          ? "Stores"
                          : language?.id === "fr"
                          ? "Magazines"
                          : "محلات",
                      headerShadowVisible: false,
                      animation: "slide_from_right",
                    }}
                  />

                  <Stack.Screen
                    name="account-debts/index"
                    options={{
                      headerTitleStyle: { fontFamily: "Kufi-Medium" },
                      headerBackground: () => (
                        <View className="bg-neutral-100 w-full h-full"></View>
                      ),
                      headerTitle:
                        language?.id === "en"
                          ? "Debts"
                          : language?.id === "fr"
                          ? "Crédits"
                          : "ديون",
                      headerShadowVisible: false,
                      animation: "slide_from_right",
                    }}
                  />
                  <Stack.Screen
                    name="debts/[id]"
                    options={{
                      headerTitleStyle: { fontFamily: "Kufi-Medium" },
                      headerBackground: () => (
                        <View className="bg-neutral-100 w-full h-full"></View>
                      ),
                      headerTitle:
                        language?.id === "en"
                          ? "Debts"
                          : language?.id === "fr"
                          ? "Crédits"
                          : "ديون",
                      headerShadowVisible: false,
                      animation: "slide_from_right",
                    }}
                  />
                  <Stack.Screen
                    name="payments/[id]"
                    options={{
                      headerTitleStyle: { fontFamily: "Kufi-Medium" },
                      headerBackground: () => (
                        <View className="bg-neutral-100 w-full h-full"></View>
                      ),
                      headerTitle:
                        language?.id === "en"
                          ? "Payments"
                          : language?.id === "fr"
                          ? "Paiements"
                          : "الدفعات",
                      headerShadowVisible: false,
                      animation: "slide_from_right",
                    }}
                  />
                  <Stack.Screen
                    name="account/index"
                    options={{
                      headerTitleStyle: { fontFamily: "Kufi-Medium" },

                      headerTitle:
                        language?.id === "en"
                          ? "Account"
                          : language?.id === "fr"
                          ? "Compte"
                          : "الحساب",
                      headerShadowVisible: false,
                      animation: "slide_from_right",
                    }}
                  />
                  <Stack.Screen
                    name="password/index"
                    options={{
                      headerTitleStyle: { fontFamily: "Kufi-Medium" },

                      headerTitle:
                        language?.id === "en"
                          ? "Password"
                          : language?.id === "fr"
                          ? "Mot de passe"
                          : "كلمة المرور",
                      headerShadowVisible: false,
                      animation: "slide_from_right",
                    }}
                  />
                  <Stack.Screen
                    name="notifications/index"
                    options={{
                      headerTitleStyle: { fontFamily: "Kufi-Medium" },
                      headerBackground: () => (
                        <View className="bg-neutral-100 w-full h-full"></View>
                      ),
                      headerTitle:
                        language?.id === "en"
                          ? "Notifications"
                          : language?.id === "fr"
                          ? "Notifications"
                          : "الإشعارات",
                      headerShadowVisible: false,
                      animation: "slide_from_right",
                    }}
                  />
                  <Stack.Screen
                    name="faq/index"
                    options={{
                      headerTitleStyle: { fontFamily: "Kufi-Medium" },
                      headerTitle:
                        language?.id === "en"
                          ? "FAQ"
                          : language?.id === "fr"
                          ? "FAQ"
                          : "الأسئلة المتداولة",
                      headerShadowVisible: false,
                      animation: "slide_from_right",
                    }}
                  />
                  <Stack.Screen
                    name="alert/index"
                    options={{
                      headerTitleStyle: { fontFamily: "Kufi-Medium" },
                      headerTitle:
                        language?.id === "en"
                          ? "Notifications"
                          : language?.id === "fr"
                          ? "Notifications"
                          : "إشعارات",
                      headerShadowVisible: false,

                      animation: "slide_from_right",
                    }}
                  />

                  <Stack.Screen
                    name="product/index"
                    options={{
                      headerTitleStyle: { fontFamily: "Kufi-Medium" },
                      headerRight: () => (
                        <TouchableOpacity activeOpacity={0.8}>
                          <ShoppingCart size={24} />
                        </TouchableOpacity>
                      ),

                      headerTitle:
                        language?.id === "en"
                          ? "Products"
                          : language?.id === "fr"
                          ? "Produits"
                          : "منتوجات",
                      headerShadowVisible: false,

                      animation: "slide_from_right",
                    }}
                  />

                  <Stack.Screen
                    name="posts/index"
                    options={{
                      headerTitleStyle: { fontFamily: "Kufi-Medium" },
                      headerTitle:
                        language?.id === "en"
                          ? "Publications"
                          : language?.id === "fr"
                          ? "Publications"
                          : "منشورات",
                      headerShadowVisible: false,

                      animation: "slide_from_right",
                    }}
                  />
                  <Stack.Screen
                    name="report/index"
                    options={{
                      headerTitleStyle: { fontFamily: "Kufi-Medium" },
                      headerTitle:
                        language?.id === "en"
                          ? "Report"
                          : language?.id === "fr"
                          ? "Signaler"
                          : "تقرير",
                      headerShadowVisible: false,
                      animation: "slide_from_right",
                    }}
                  />
                  <Stack.Screen
                    name="conversation/[id]"
                    options={{
                      headerShown: false,
                      animation: "slide_from_right",
                    }}
                  />
                </Stack>
              </ChatProvider>
            </MessagesProvider>
          </NotificationProvider>
        </UserProvider>
      </SessionProvider>
    </GestureHandlerRootView>
  );
};

export default ProtectedLayout;
