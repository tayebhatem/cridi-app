import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { router, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import LanguageProvider from '@/providers/LanguageProvider';
import notifee, { EventType } from '@notifee/react-native';
import { markAsRead } from '@/actions/notifications';
import { TamaguiProvider } from '@tamagui/core'
import config from '../tamagui.config'
import { ToastProvider } from 'react-native-toast-notifications'
import { AlertCircle, CheckCircle } from '@tamagui/lucide-icons';
import { Card } from 'tamagui';
import Toast from '@/components/ui/Toast';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
 
  
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    'Kufi-Light':require('../assets/fonts/Kufi/NotoKufiArabic-Light.ttf'),
    'Kufi-Regular':require('../assets/fonts/Kufi/NotoKufiArabic-Regular.ttf'),
    'Kufi-Medium':require('../assets/fonts/Kufi/NotoKufiArabic-Medium.ttf'),
    'Kufi-SemiBold':require('../assets/fonts/Kufi/NotoKufiArabic-SemiBold.ttf'),
    'Kufi-Bold':require('../assets/fonts/Kufi/NotoKufiArabic-Bold.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);
  useEffect(() => {
    return notifee.onForegroundEvent(({ type, detail }) => {
   
    if(type===EventType.PRESS){
 if(detail.notification?.android?.channelId==="chat-messages"){
  const channelId = 'messaging:'+detail.notification?.data?.channel_id;
 
  router.push(`/conversation/${channelId}`)
 }else{
  const channelId=detail.notification?.android?.channelId
  
  if(detail.notification?.data?.type==='debt'){
   router.push(`/debts/${channelId}`)
  }else if(detail.notification?.data?.type==='payment'){
   router.push(`/payments/${channelId}`)
  }else{
   router.push('/')
  }
 }
     
    }
    });
   

    
  }, []);

  useEffect(() => {
    return notifee.onBackgroundEvent(async ({ type, detail }) => {
      if (type === EventType.PRESS) {
        if(detail.notification?.android?.channelId==="chat-messages"){

          const channelId = 'messaging:'+detail.notification?.data?.channel_id;
          router.push(`/conversation/${channelId}`)

         }else{
          const channelId=detail.notification?.android?.channelId 
           
          if(detail.notification?.data?.type==='debt'){   
           router.push(`/debts/${channelId}`)
          }else if(detail.notification?.data?.type==='payment'){
           router.push(`/payments/${channelId}`)
          }else if(detail.notification?.data?.type==='request'){
            const id=detail.notification?.data?.text
            router.push(`/store/${id}`)
           }else{
           router.push('/')
          }

          //mark as read
          const id=detail.notification?.data?.id as string
          await markAsRead(id)
         }
      }
    });

  }, [])
  
  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView>

   
    <TamaguiProvider config={config}>

<ToastProvider 
style={{width:'100%'}}
successColor='#16a34a'
dangerColor='#ef4444'
textStyle={{fontFamily:'Kufi-Medium'}}
 successIcon={<CheckCircle size={24} color={"#FFF"}/>}
 dangerIcon={<AlertCircle size={24} color={"#FFF"}/>}
 offset={5}
>

   
      <LanguageProvider>

   
      <Stack>
      <Stack.Screen name="index" options={{ headerShown: false,animation:'slide_from_right' }} />
      
      <Stack.Screen name="auth" options={{ headerShown: false,animation:'slide_from_right'  }} />
      <Stack.Screen name="(protected)" options={{ headerShown: false,animation:'slide_from_right'  }} />
      
      <Stack.Screen name="error/index" options={{ headerShown: false,animation:'none' }} />
      <Stack.Screen name="user-type/index" options={{animation:'slide_from_right',headerTitle:'',headerShadowVisible:false}} />
      <Stack.Screen name="supplier/index" options={{animation:'slide_from_right',headerTitle:'',headerShadowVisible:false}}/>
      <Stack.Screen name="policy/index" options={{animation:'slide_from_right',headerTitle:'',headerShadowVisible:false}}/>
      </Stack>
      </LanguageProvider>
        
</ToastProvider>
      </TamaguiProvider>
      </GestureHandlerRootView>
  );
}
