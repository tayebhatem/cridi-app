import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { router, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import LanguageProvider from '@/providers/LanguageProvider';
import notifee, { EventType,AndroidImportance } from '@notifee/react-native';
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
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
         }
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
    });

  }, [])
  
  if (!loaded) {
    return null;
  }

  return (
    
   
      <LanguageProvider>

   
      <Stack>
      <Stack.Screen name="index" options={{ headerShown: false,animation:'slide_from_right' }} />
      
      <Stack.Screen name="auth" options={{ headerShown: false,animation:'slide_from_right'  }} />
      <Stack.Screen name="(protected)" options={{ headerShown: false,animation:'slide_from_right'  }} />
      <Stack.Screen name="stores/index" options={{ headerShown: false,animation:'slide_from_right' }} />
      <Stack.Screen name="error/index" options={{ headerShown: false,animation:'none' }} />
      </Stack>
      </LanguageProvider>
   
    
  );
}
