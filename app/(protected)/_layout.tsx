
import React, { useEffect } from 'react'
import { router, Stack } from 'expo-router'
import SessionProvider from '@/providers/SessionProvider'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import ChatProvider from '@/providers/ChatProvider'
import MessagesProvider from '@/providers/MessagesProvider'
import NotificationProvider from '@/providers/NotificationProvider'
import {Appearance} from 'react-native'
import { Linking } from 'react-native';
import UserProvider from '@/providers/UserProvider'
const ProtectedLayout = () => {
  
 

  useEffect(() => {
    const handleOpenURL = (url:string) => {
     console.log(url)
    };
  
    const subscription = Linking.addEventListener('url', ({ url }) => {
      handleOpenURL(url);
    });
  
    return () => {
      subscription.remove();
    };
  }, []);
  
 
  useEffect(() => {
    // Lock the appearance to 'dark' mode
    const lockDarkMode = () => {
      if (Appearance.getColorScheme() !== 'light') {
        Appearance.setColorScheme('light');
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
          <Stack.Screen name="dashboard" options={{ headerShown: false,animation:'default'  }} />
          <Stack.Screen name="store/[id]" options={{ headerShown: false,animation:'slide_from_right'  }} />
          <Stack.Screen name="stores/index" options={{ headerShown: false,animation:'slide_from_right' }} />
          <Stack.Screen name="debts/[id]" options={{ headerShown: false,animation:'slide_from_right'  }} />
          <Stack.Screen name="payments/[id]" options={{ headerShown: false,animation:'slide_from_right'  }} />
          <Stack.Screen name="account/index" options={{ headerShown: false,animation:'slide_from_right'  }} />
          <Stack.Screen name="password/index" options={{ headerShown: false,animation:'slide_from_right'  }} />
          <Stack.Screen name="notifications/index" options={{ headerShown: false,animation:'slide_from_right'  }} />
          <Stack.Screen name="faq/index" options={{ headerShown: false,animation:'slide_from_right'  }} />
          <Stack.Screen name="report/index" options={{ headerShown: false,animation:'slide_from_right'  }} />
          <Stack.Screen name="conversation/[id]" options={{ headerShown: false,animation:'slide_from_right'  }} />
        
    </Stack>
    
    </ChatProvider>
    </MessagesProvider>
    </NotificationProvider>
    </UserProvider>
    </SessionProvider>

      
    </GestureHandlerRootView>
  )
}

export default ProtectedLayout