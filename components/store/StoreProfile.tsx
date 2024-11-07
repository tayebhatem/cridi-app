import { View, Text, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AccountUserType, StoreType } from '@/types';
import { getAccountStore, getStore } from '@/actions/store';
import Avatar from '../ui/Avatar';
import { AntDesign, Entypo, MaterialIcons } from '@expo/vector-icons';
import CardLayout from '../ui/CardLayout';
import PageLayout from '../ui/PageLayout';
import useAccountStore from '@/stores/useAccountStore';
import Loader from '../ui/Loader';
import { createRequest, deleteRequest } from '@/libs/appwrite';
import { useChatContext } from 'stream-chat-expo';
import { router } from 'expo-router';
import useLanguageStore from '@/stores/useLanguageStore';
import { Plus,Check } from '@tamagui/lucide-icons'
const StoreProfile = ({ id }: { id: string }) => {
    const [store, setStore] = useState<StoreType | undefined>();
    const [accountUser, setAccountUser] = useState<AccountUserType | null | undefined>();
    const { language } = useLanguageStore();
    const [isLoading, setisLoading] = useState(true);
    const { account } = useAccountStore();
    const { client } = useChatContext();

    const startChat = async () => {
        try {
            if (account && store) {
                const channel = client.channel('messaging', {
                    members: [account?.id, store?.id],
                });
                await channel.watch();

                router.push(`../conversation/${channel.cid}`);
            }
        } catch (error) {
           
        }
    };

    const sendRequest = async () => {
        if (id && account) {
            try {
                const data = await createRequest(account, id);
                if (data) setAccountUser(data);
            } catch (error) {

            }
        }
    };

    const cancelRequest=async()=>{
    if(accountUser){
        try {
            await deleteRequest(accountUser?.id)
            setAccountUser(null)
          } catch (error) {
            
          }
    }
    }

    useEffect(() => {
        if (account && id) {
            const fetchStore = async () => {
                try {
                    const data = await getStore(id);
                    setStore(data);
                } catch (error) {}
            };
            const fetchAccountUser = async () => {
                try {
                    const data = await getAccountStore(account.id, id);
                    if (data) setAccountUser(data);
                } catch (error) {
                } finally {
                    setisLoading(false);
                }
            };
            fetchStore();
            fetchAccountUser();
        }
    }, [id]);

    if (isLoading) return <Loader />;

    return (
        <PageLayout>
            <CardLayout>
                <View className="space-y-4">
                    <View className="flex flex-row items-center">
                        <Avatar size="Medium" uplaod={false} url={store?.avatar} />
                        <View>
                            <Text className="text-xl font-medium">
                                {store?.name}
                            </Text>
                            <View className="flex flex-row items-center space-x-1">
                                <MaterialIcons name="location-pin" color={"#A3A3A3"} size={16} />
                                <Text className="text-neutral-400">{store?.adress}</Text>
                            </View>
                            <View className="flex flex-row items-center space-x-1">
                                <MaterialIcons name="phone" color={"#A3A3A3"} size={16} />
                                <Text className="text-neutral-400">{store?.phone}</Text>
                            </View>
                        </View>
                    </View>

                    <View className="flex flex-row space-x-2">
                        <View className="flex-1">
                            <TouchableOpacity
                                onPress={accountUser?cancelRequest:sendRequest}
                                activeOpacity={0.8}
                                className='bg-primary-500 flex flex-row justify-center space-x-2 rounded-md p-3 shadow-primary-500 shadow-md'
                            >
                                {accountUser ? (
                                   <Check size={24} color="#FFF"/>
                                ) : (
                                    <Plus size={24} color="#FFF"/>
                                )}
                                <Text className="text-white font-kufi-medium text-base text-center leading-7">
                                    {language?.id === 'en'
                                        ? accountUser
                                            ? 'Cancel'
                                            : 'Add'
                                        : language?.id === 'fr'
                                        ? accountUser
                                            ? 'Annuler'
                                            : 'Ajouter'
                                        : accountUser
                                        ? 'إلغاء'
                                        : 'أضف'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View className="flex-1">
                            <TouchableOpacity
                                onPress={startChat}
                                activeOpacity={0.8}
                                className="bg-neutral-100 flex flex-row justify-center space-x-2 rounded-md p-3 shadow-primary-500 shadow-md"
                            >
                                <AntDesign name="message1" size={24} color="#A3A3A3" />
                                <Text className="text-neutral-400 font-kufi-medium text-base text-center leading-7">
                                    {language?.id === 'en'
                                        ? 'Contact'
                                        : language?.id === 'fr'
                                        ? 'Contacter'
                                        : 'تواصل'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </CardLayout>
        </PageLayout>
    );
};

export default StoreProfile;
