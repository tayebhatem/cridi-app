import { View, Text, FlatList, RefreshControl } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import useLanguageStore from "@/stores/useLanguageStore";
import { NotificationType } from "@/types";
import { getNotifications, markAsRead } from "@/actions/notifications";
import useAccountStore from "@/stores/useAccountStore";
import NotificationItem from "@/components/notifications/NotificationItem";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native";
import useNotificationsStore from "@/stores/useNotificationsStore";
import EmptyList from "@/components/ui/EmptyList";
import DelayList from "@/components/customer/DelayList";
import RequestsList from "@/components/supplier/RequestsList";

const NotificationScreen = () => {
  const { account } = useAccountStore();

  if (account?.type === "CLIENT") return <DelayList />;
  else return <RequestsList />;
};

export default NotificationScreen;
