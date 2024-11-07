import { View, Text } from 'react-native'
import React, { ReactNode, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import useNotificationsStore from '@/stores/useNotificationsStore'
import useAccountStore from '@/stores/useAccountStore'
import { getUnreedNotificationsCount } from '@/actions/notifications'
import { NotificationType } from '@/types'
import { client, config, updateAccountDeviceToken } from '@/libs/appwrite'
import notifee, { AndroidImportance, AndroidVisibility } from '@notifee/react-native';
import useLanguageStore from '@/stores/useLanguageStore'
import messaging from '@react-native-firebase/messaging';

const NotificationProvider = ({children}:{children:ReactNode}) => {
 
const {
  adsNotifications,
  transactionsNotifications,
  requestNotifications,
  setAdsNotification,
  setMessagesNotification,
  setRequestsNotification,
  setTransactionsNotification,
  setUnreadNotificationsCount,
  incrementUnreadNotificationsCount,
  decrementUnreadNotificationsCount,
  updateNotification,
  addNotification
}=useNotificationsStore()
const{account}=useAccountStore()
const {language}=useLanguageStore()

 const getFcmToken = async () => {
  const permission = await messaging().requestPermission();

  if (permission === messaging.AuthorizationStatus.AUTHORIZED ||
      permission === messaging.AuthorizationStatus.PROVISIONAL) {
    const token = await messaging().getToken();
   
  if(account){
  const data=  await updateAccountDeviceToken(account.id,token)
  console.log(data)
  }   
  } else {
    console.log("Notification permission not granted.");
  }
};

const  onDisplayNotification=async(notification:NotificationType)=> {
  const channelId = await notifee.createChannel({
    id: notification.accountuser,
    name: 'cridi',
  });
  await notifee.requestPermission();
  await notifee.displayNotification({
    title: notification.storeName,
    body:notification.type==='debt' ||  notification.type==='payment'?language?.id==='en'?`${notification.text} added by ${notification.storeName}`:language?.id==='fr'?`${notification.text} ajouté par ${notification.storeName}`:`تمت إضافة ${notification.text}  بواسطة ${notification.storeName}`
    :notification.type==='request'? language?.id==='en'?`${notification.storeName} accepted your request`:language?.id==='fr'?`${notification.storeName} a accepté votre demande`:`${notification.storeName} قبل طلبك`
    :notification.text,
    data:{
      id:notification.id,
      type:notification.type,
      text:notification.text
    },
    android: {
      channelId,
     largeIcon:notification.storeImage,
      importance:AndroidImportance.HIGH,
      visibility: AndroidVisibility.PUBLIC, 
      pressAction: {
        id: 'default',
      },
    },
  });
 
   
}


  useEffect(() => {
   // getFcmToken()

    const fetchNotificationsCount=async()=>{

      if(account){
      
        try {
          const count=await getUnreedNotificationsCount(account.id)
          if(!count) return
         
          setUnreadNotificationsCount(count)
        } catch (error) {
          
        }
      }
      }
      fetchNotificationsCount()


    const setNotifications=async()=>{
          try {
            const ads= await AsyncStorage.getItem('ads-notifications')
            const requests= await AsyncStorage.getItem('requests-notifications')
          const transactions= await AsyncStorage.getItem('transaction-notifications')
          const messages= await AsyncStorage.getItem('messages-notifications')
           if(!ads){
            setAdsNotification(true)
           }
           if(!requests){
            setRequestsNotification(true)
           }
           if(!transactions){
                    setTransactionsNotification(true)
           }
           if(!messages){
                setMessagesNotification(true)
           }
          } catch (error) {
            console.log(error)
          }
    }
    setNotifications()

    
  }, [])

  useEffect(() => {
    let unsubscribe: (() => void) | null = null;

  
    if(account){

      const subscribe = async () => {
      try {
        unsubscribe = client.subscribe(`databases.${config.database}.collections.${config.notifications}.documents`, response => {

       
          if (response.events.includes("databases.*.collections.*.documents.*.create")) {
            if (!response.payload) return;
            const data: any = response.payload;
  
            if (data.account === account.id) {
              const newNotification: NotificationType = {
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
              addNotification(newNotification)
              incrementUnreadNotificationsCount()

            if(transactionsNotifications && (newNotification.type==='debt' || newNotification.type==='payment'))  onDisplayNotification(newNotification)
            if(adsNotifications && newNotification.type==='publication')   onDisplayNotification(newNotification)
              if(requestNotifications && newNotification.type==='request')   onDisplayNotification(newNotification)
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

             updateNotification(notification)
           
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


    }

    
   
  }, [account]);

  return (
   <>
   {children}
   </>
  )
}

export default NotificationProvider