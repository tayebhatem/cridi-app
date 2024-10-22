import { View, Text, ScrollView, FlatList, RefreshControl } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import PageLayout from '@/components/ui/PageLayout'
import PageHeader from '@/components/ui/PageHeader'
import CardLayout from '@/components/ui/CardLayout'
import useLanguageStore from '@/stores/useLanguageStore'
import { NotificationType } from '@/types'
import { getNotifications } from '@/actions/notifications'
import useAccountStore from '@/stores/useAccountStore'

import { client, config } from '@/libs/appwrite'
import NotificationItem from '@/components/notifications/NotificationItem'
import notifee, { EventType,AndroidImportance } from '@notifee/react-native';
import moment, { lang } from 'moment';
import 'moment/locale/fr'; 
import 'moment/locale/ar'; 
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { TouchableOpacity } from 'react-native'
import useNotificationsStore from '@/stores/useNotificationsStore'
import EmptyList from '@/components/ui/EmptyList'
const NotificationScreen = () => {
  const {language}=useLanguageStore()
   const [notifications, setNotifications] = useState<NotificationType[]>([])
   const [data, setData] = useState<NotificationType[]>([])
   const [filter, setFilter] = useState('all')
   const {account}=useAccountStore()
  const {
    adsNotifications,
    transactionsNotifications,
    incrementUnreadNotificationsCount,
    decrementUnreadNotificationsCount
  }=useNotificationsStore()
   const [isLoading, setIsLoading] = useState(false)
   const filterDateData=[
    {
      id:'all',
      name:{
        en:'All',
        fr:'tout',
        ar:'الكل'
      }
    },
    {
      id:'debt',
      name:{
        en:'Debts',
        fr:'Crédits',
        ar:'ديون'
      }
    },
    {
      id:'payment',
      name:{
        en:'Payments',
        fr:'paiements',
        ar:'دفعات'
      }
    },
    {
      id:'publication',
      name:{
        en:'Ads',
        fr:'annonces',
        ar:'إعلانات'
      }
    },
  ]

  const filterNotifcations=(id:string)=>{
    setFilter(id)
         if(id==='all'){
          setNotifications(data)
         }else{
          const filterData=data.filter((item)=>item.type===id)
          setNotifications(filterData)
         }
  }

   async function onDisplayNotification(notification:NotificationType) {
  
    // Create a channel (required for Android)
    
    const channelId = await notifee.createChannel({
      id: notification.accountuser,
      name: 'cridi',
    });
    await notifee.requestPermission();
    // Display a notification
    await notifee.displayNotification({
      title: notification.storeName,
      body:notification.type==='debt' ||  notification.type==='payment'?language?.id==='en'?`${notification.text} added by ${notification.storeName}`:language?.id==='fr'?`${notification.text} ajouté par ${notification.storeName}`:`تمت إضافة ${notification.text}  بواسطة ${notification.storeName}`:notification.text,
      data:{type:notification.type},
      android: {
        channelId,
       largeIcon:notification.storeImage,
        importance:AndroidImportance.HIGH,
        pressAction: {
          id: 'default',
        },
      },
    });
   
     
  }




const fetchNotifications=useCallback(async()=>{
  if(account){
   
    try {
      const data=await getNotifications(account.id)
      if(!data) return
      setData(data)
      setNotifications(data)
      setFilter('all')
   } catch (error) {
     console.log(error)
   }
  }
  },[account])

  useEffect(() => {
    fetchNotifications()
  }, [account])

  useEffect(() => {
    let unsubscribe: (() => void) | null = null;
    const subscribe = async () => {
      if (!account) return;
  
      try {
        unsubscribe = client.subscribe(`databases.${config.database}.collections.${config.notifications}.documents`, response => {

          if (response.events.includes("databases.*.collections.*.documents.*.create")) {
            if (!response.payload) return;
            const data: any = response.payload;
  
            if (data.account === account.id) {
              const notification: NotificationType = {
                id: data.$id,
                account: data.account,
                accountuser: data.accountUser,
                date: data.$createdAt,
                read: data.read,
                storeImage: data.storeImage,
                storeName: data.storeName,
                text: data.text,
                type: data.type
              };
              incrementUnreadNotificationsCount()
            if(transactionsNotifications && (notification.type==='debt' || notification.type==='payment'))  onDisplayNotification(notification)
            if(adsNotifications && notification.type==='publication')   onDisplayNotification(notification)
              setNotifications(prevNotifications => [notification, ...prevNotifications]);
              setData(prevNotifications => [notification, ...prevNotifications]);


            }

           
          }
         

          if (response.events.includes("databases.*.collections.*.documents.*.update")) {
            if (!response.payload) return;
            const data: any = response.payload;
  
            if (data.account === account.id) {
              const notification: NotificationType = {
                id: data.$id,
                account: data.account,
                accountuser: data.accountUser,
                date: data.$createdAt,
                read: data.read,
                storeImage: data.storeImage,
                storeName: data.storeName,
                text: data.text,
                type: data.type
              };
  
              decrementUnreadNotificationsCount()

              setNotifications(prevNotifications => 
                prevNotifications.map(item => 
                  item.id === notification.id ? { ...item, ...notification } : item
                )
              );
              setData(prevNotifications => 
                prevNotifications.map(item => 
                  item.id === notification.id ? { ...item, ...notification } : item
                )
              );
            }
           
          }

        });
      } catch (error) {
        console.log(error);
      }
    };
  
    subscribe();
  
  
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [account,transactionsNotifications,adsNotifications]);
  



  
  return (
   <SafeAreaView className='h-full py-4  bg-white dark:bg-dark-500 space-y-4'>
     <View className='px-4'>
  <Text className='text-lg font-kufi-medium text-left'>
  {language?.id==='en'?"Notifications":language?.id==='fr'?"Notifications":"الإشعارات"}
  </Text>
   </View>
   
    <View className='flex flex-row items-center space-x-2  px-4'>
     {
      filterDateData.map((item)=>(
        <TouchableOpacity 
        onPress={()=>filterNotifcations(item.id)}
        key={item.id} 
        activeOpacity={0.8} 
        className={` px-3 rounded-full shadow-black shadow-md ${item.id===filter && 'bg-neutral-200 dark:bg-dark-400'}`}>
        <Text className={`font-kufi-medium cap  ${item.id===filter?'text-black dark:text-white':'text-neutral-400'}`}>{
          language?.id==='en'?item.name.en:language?.id==='fr'?item.name.fr:item.name.ar
          }</Text>
      </TouchableOpacity>
      ))
     
     }
    </View>
 <FlatList 
 className='h-full'
 refreshControl={
  <RefreshControl refreshing={isLoading}  onRefresh={fetchNotifications}/>
 }
 showsHorizontalScrollIndicator={false}
 showsVerticalScrollIndicator={false}
 data={notifications}
 contentContainerStyle={{margin:notifications.length>0?0:'auto'}}
 keyExtractor={item=>item.id}
 renderItem={(item)=>(<NotificationItem notification={item.item}/>)}
 ListEmptyComponent={()=>(
<View>
  <EmptyList 
 subText={language?.id === 'en' 
  ? 'You will see notifications here once they arrive.' 
  : language?.id === 'fr' 
  ? 'Vous verrez les notifications ici dès qu\'elles arriveront.' 
  : 'سترى الإشعارات هنا بمجرد وصولها.'}
title={language?.id==='en'?"There are no notifications currently.":language?.id==='fr'?"Il n'y a aucune notification actuellement.":"لا يوجد إشعارات حاليا."}/>
</View>
 )}

 />
   </SafeAreaView>
  )
}

export default NotificationScreen