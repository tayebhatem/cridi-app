import { View, Text, FlatList, RefreshControl } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { getNotifications } from "@/actions/notifications";
import useLanguageStore from "@/stores/useLanguageStore";
import useAccountStore from "@/stores/useAccountStore";
import useNotificationsStore from "@/stores/useNotificationsStore";
import NotificationItem from "@/components/notifications/NotificationItem";
import EmptyList from "@/components/ui/EmptyList";

const AlertPage = () => {
  const { language } = useLanguageStore();

  const { account } = useAccountStore();
  const {
    notifications,
    setNotifications,
    updateNotification,
    setUnreadNotificationsCount,
  } = useNotificationsStore();
  const [isLoading, setIsLoading] = useState(false);

  const fetchNotifications = useCallback(async () => {
    if (account) {
      try {
        const data = await getNotifications(account.id);
        if (!data) return;
        setNotifications(data);
      } catch (error) {
        console.log(error);
      }
    }
  }, [account]);

  useEffect(() => {
    fetchNotifications();
  }, [account]);

  return (
    <View className="bg-white w-full h-full ">
      <FlatList
        className="h-full"
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={fetchNotifications}
          />
        }
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        data={notifications}
        contentContainerStyle={{
          margin: notifications.length > 0 ? 0 : "auto",
        }}
        keyExtractor={(item) => item.id}
        renderItem={(item) => <NotificationItem notification={item.item} />}
        ListEmptyComponent={() => (
          <View>
            <EmptyList
              subText={
                language?.id === "en"
                  ? "You will see notifications here once they arrive."
                  : language?.id === "fr"
                  ? "Vous verrez les notifications ici dès qu'elles arriveront."
                  : "سترى الإشعارات هنا بمجرد وصولها."
              }
              title={
                language?.id === "en"
                  ? "There are no notifications currently."
                  : language?.id === "fr"
                  ? "Il n'y a aucune notification actuellement."
                  : "لا يوجد إشعارات حاليا."
              }
            />
          </View>
        )}
      />
    </View>
  );
};

export default AlertPage;
