
import React from 'react'
import { Stack } from 'expo-router'
import SessionProvider from '@/providers/SessionProvider'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import ChatProvider from '@/providers/ChatProvider'
import MessagesProvider from '@/providers/MessagesProvider'
import NotificationProvider from '@/providers/NotificationProvider'
const ProtectedLayout = () => {
  return (
    <GestureHandlerRootView>
      
    
    <SessionProvider>
   
  <MessagesProvider>     
    <ChatProvider>
    <NotificationProvider>
    <Stack>
          <Stack.Screen name="dashboard" options={{ headerShown: false,animation:'default'  }} />
          <Stack.Screen name="store/[id]" options={{ headerShown: false,animation:'slide_from_right'  }} />
        
          <Stack.Screen name="debts/[id]" options={{ headerShown: false,animation:'slide_from_right'  }} />
          <Stack.Screen name="payments/[id]" options={{ headerShown: false,animation:'slide_from_right'  }} />
          <Stack.Screen name="account/index" options={{ headerShown: false,animation:'slide_from_right'  }} />
          <Stack.Screen name="password/index" options={{ headerShown: false,animation:'slide_from_right'  }} />
          <Stack.Screen name="notifications/index" options={{ headerShown: false,animation:'slide_from_right'  }} />
          <Stack.Screen name="faq/index" options={{ headerShown: false,animation:'slide_from_right'  }} />
          <Stack.Screen name="report/index" options={{ headerShown: false,animation:'slide_from_right'  }} />
          <Stack.Screen name="conversation/[id]" options={{ headerShown: false,animation:'slide_from_right'  }} />
    </Stack>
    </NotificationProvider>
    </ChatProvider>
    </MessagesProvider>
    
    </SessionProvider>

      
    </GestureHandlerRootView>
  )
}

export default ProtectedLayout