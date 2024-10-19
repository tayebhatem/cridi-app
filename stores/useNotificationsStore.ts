import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

interface NotificationsState {
    messagesNotification: boolean;
    transactionsNotifications: boolean;
    adsNotifications: boolean;
    unreadMessagesCount: number;
    unreadNotificationsCount: number;
    setMessagesNotification: (messagesNotification: boolean) => void;
    setTransactionsNotification: (transactionsNotifications: boolean) => void;
    setAdsNotification: (adsNotifications: boolean) => void;
    setUnreadMessagesCount: (count: number) => void;
    setUnreadNotificationsCount: (count: number) => void;
    incrementUnreadMessagesCount: () => void;
    decrementUnreadMessagesCount: () => void;
    incrementUnreadNotificationsCount: () => void;
    decrementUnreadNotificationsCount: () => void;
}

const useNotificationsStore = create<NotificationsState>((set) => ({
    messagesNotification: true,
    adsNotifications: true,
    transactionsNotifications: true,
    unreadMessagesCount: 0,
    unreadNotificationsCount: 0,

    setMessagesNotification: async (messagesNotification: boolean) => {
        try {
            await AsyncStorage.setItem('messages-notifications', messagesNotification ? 'enabled' : 'disabled');
            set({ messagesNotification });
        } catch (error) {
            console.error("Failed to save messages notification setting:", error);
        }
    },

    setAdsNotification: async (adsNotifications: boolean) => {
        try {
            await AsyncStorage.setItem('ads-notifications', adsNotifications ? 'enabled' : 'disabled');
            set({ adsNotifications });
        } catch (error) {
            console.error("Failed to save ads notification setting:", error);
        }
    },

    setTransactionsNotification: async (transactionsNotifications: boolean) => {
        try {
            await AsyncStorage.setItem('transaction-notifications', transactionsNotifications ? 'enabled' : 'disabled');
            set({ transactionsNotifications });
        } catch (error) {
            console.error("Failed to save transactions notification setting:", error);
        }
    },

    setUnreadMessagesCount: (count: number) => {
        set({ unreadMessagesCount: Math.max(0, count) }); // Ensure it does not go below zero
    },

    setUnreadNotificationsCount: (count: number) => {
        set({ unreadNotificationsCount: Math.max(0, count) }); // Ensure it does not go below zero
    },

    incrementUnreadMessagesCount: () => set((state) => ({
        unreadMessagesCount: state.unreadMessagesCount + 1,
    })),

    decrementUnreadMessagesCount: () => set((state) => ({
        unreadMessagesCount: Math.max(0, state.unreadMessagesCount - 1), // Prevent negative count
    })),

    incrementUnreadNotificationsCount: () => set((state) => ({
        unreadNotificationsCount: state.unreadNotificationsCount + 1,
    })),

    decrementUnreadNotificationsCount: () => set((state) => ({
        unreadNotificationsCount: Math.max(0, state.unreadNotificationsCount - 1), // Prevent negative count
    })),
}));

export default useNotificationsStore;
