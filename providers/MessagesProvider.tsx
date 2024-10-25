import useAccountStore from '@/stores/useAccountStore';
import { useState, useEffect, useRef, ReactNode } from 'react';
import { useChatContext } from 'stream-chat-expo';
import messaging from '@react-native-firebase/messaging'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StreamChat } from 'stream-chat';
import notifee, { EventType } from '@notifee/react-native';
import useNotificationsStore from '@/stores/useNotificationsStore';

const key=process.env.EXPO_PUBLIC_STREAM_KEY || ''

const requestPermission = async () => {

  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
};



export default function MessagesProvider({children}:{children:ReactNode}) {
  const client = StreamChat.getInstance(key);
  const [isReady, setIsReady] = useState(false);
  const unsubscribeTokenRefreshListenerRef = useRef<() => void>();
  const {account}=useAccountStore()
 const {messagesNotification}=useNotificationsStore()
 
  useEffect(() => {
  if(account){
   
    const registerPushToken = async () => {
     
     try {
      unsubscribeTokenRefreshListenerRef.current?.();
      const token = await messaging().getToken();
      const push_provider = 'firebase';

      const push_provider_name = 'cridi'; // name an alias for your push provider (optional)
      client.setLocalDevice({
        id: token,
        push_provider,
        push_provider_name
      });
      await AsyncStorage.setItem('@current_push_token', token);
  
      const removeOldToken = async () => {
        const oldToken = await AsyncStorage.getItem('@current_push_token');
        if (oldToken !== null) {
          await client.removeDevice(oldToken);
        }
      };
  
      unsubscribeTokenRefreshListenerRef.current = messaging().onTokenRefresh(async newToken => {
        await Promise.all([
          removeOldToken(),
          client.addDevice(newToken, push_provider, account.id,push_provider_name),
          AsyncStorage.setItem('@current_push_token', newToken),
        ]);
      });
     } catch (error) {
      console.log(error)
     }
    };

    const init = async () => {
      await requestPermission();
      await registerPushToken();
      setIsReady(true);
    };

    init();

  

  }



  return  () => {
      unsubscribeTokenRefreshListenerRef.current?.();

    };
  }, []);


  useEffect(() => {
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      if(!remoteMessage.data || !messagesNotification) return
      // handle the message
     
      const messageId=remoteMessage.data.id as string
     
      const message = await client.getMessage(messageId);
    
      // create the android channel to send the notification to
      const channelId = await notifee.createChannel({
        id: 'chat-messages',
        name: 'Chat Messages',
      });
      await notifee.requestPermission();
      // display the notification
      const { stream, ...rest } = remoteMessage.data ?? {};
      const data = {
        ...rest,
        ...((stream as unknown as Record<string, string> | undefined) ?? {}), // extract and merge stream object if present
      };
      if(!message.message.user) return
      
  await notifee.displayNotification({
        title: message.message.user.name,
        body: message.message.text,
        data,
        android: {
          channelId,
          pressAction: {
            id: 'default',
          },
        },
      });

    });
    
  }, [messagesNotification])


  useEffect(() => {
    
    // add listener to notifications received when on foreground
    const unsubscribeOnMessage = messaging().onMessage(async remoteMessage => {
      if(!remoteMessage.data || !messagesNotification) return
      const messageId=remoteMessage.data.id as string
      const message = await client.getMessage(messageId);
        
      // create the android channel to send the notification to
      const channelId = await notifee.createChannel({
        id: 'chat-messages',
        name: 'Chat Messages',
      });
    await notifee.requestPermission();
      // display the notification
      const { stream, ...rest } = remoteMessage.data ?? {};
      const data = {
        ...rest,
        ...((stream as unknown as Record<string, string> | undefined) ?? {}), // extract and merge stream object if present
      };
      if(!message.message.user) return
     await notifee.displayNotification({
        title: message.message.user.name,
        body: message.message.text,
        
        data,
        android: {
          channelId,
        
          pressAction: {
            id: 'default',
          },
        },
      });
    });
 
  
    return () => {
      unsubscribeOnMessage();
    };
  }, [messagesNotification]);

 
 
if(!isReady) return null
  return (
  <>
  {children}
  </>
  );
}
