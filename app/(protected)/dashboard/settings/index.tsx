import { View, Text, TouchableOpacity, useColorScheme } from 'react-native';
import React, { useEffect, useState } from 'react';
import {  useRouter } from 'expo-router';
import {  FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { deleteSession } from '@/libs/appwrite';
import ConfirmModal from '@/components/ui/ConfirmModal';
import PageLayout from '@/components/ui/PageLayout';
import LanguageDrawer from '@/components/ui/LanguageDrawer';

import { settingsTranslation } from '@/constants/translation';
import useLanguageStore from '@/stores/useLanguageStore';
import CardLayout from '@/components/ui/CardLayout';
import useNotificationsStore from '@/stores/useNotificationsStore';
import useAccountStore from '@/stores/useAccountStore';
import { User,Lock,Languages,Bell,AlertTriangle,MessageCircleQuestion, LogOut } from '@tamagui/lucide-icons'

const SettingsScreen = () => {
  const router = useRouter();
 
  const [open, setOpen] = useState(false);
  const [openLanguage, setopenLanguage] = useState(false);
  const { language } = useLanguageStore();
  const {setUnreadNotificationsCount,setUnreadMessagesCount}=useNotificationsStore()
  const{clearAccount}=useAccountStore()
  const settings = settingsTranslation(language);
  const logout = async () => {
    try {
      const response = await deleteSession();
      if (response) {
        setUnreadMessagesCount(0)
        setUnreadNotificationsCount(0)
       // clearAccount()
        setOpen(false)
        router.replace('/auth/sign-in');
      }
    } catch (error) {
      console.log(error);
    }
  };

 
 
  
  return (
    <>
      <PageLayout>
      <View className='p-2 '>
  <Text className='text-lg font-kufi-medium text-left'>
  {settings.settingsTile}
  </Text>
   </View>
      

   <View>
   <CardLayout>
      <View className='space-y-4'>

<TouchableOpacity
  onPress={() => router.push('../../account')}
  activeOpacity={0.8}
  className='flex flex-row items-center pb-4 w-full border-b border-neutral-100 dark:border-dark-300'>
  <View className='flex flex-row items-center gap-x-3 w-full'>
   
    <User size={24} color={'#A3A3A3'}/>
    <Text className='text-neutral-400 font-kufi-medium'>{settings.account}</Text>
  </View>
  <MaterialIcons name='arrow-forward-ios' color={'#A3A3A3'} size={24} />
</TouchableOpacity>

<TouchableOpacity
  onPress={() => router.push('../../password')}
  activeOpacity={0.8}
  className='flex flex-row items-center justify-between w-full pb-4 border-b border-neutral-100 dark:border-dark-300'>
  <View className='flex flex-row items-center gap-x-3 w-full'>
  <Lock size={24} color={'#A3A3A3'}/>
    <Text className='text-neutral-400 font-kufi-medium'>{settings.password}</Text>
  </View>
  <MaterialIcons name='arrow-forward-ios' color={'#A3A3A3'} size={24} />
</TouchableOpacity>

<TouchableOpacity
  onPress={() => router.push('../../notifications')}
  activeOpacity={0.8}
  className='flex flex-row items-center w-full pb-4 border-b border-neutral-100 dark:border-dark-300'>
  <View className='flex flex-row items-center gap-x-3 w-full'>
  <Bell size={24} color={'#A3A3A3'}/>
    <Text className='text-neutral-400 font-kufi-medium'>{settings.notifications}</Text>
  </View>
  <MaterialIcons name='arrow-forward-ios' color={'#aaa'} size={24} />
</TouchableOpacity>
{
  /*
  <TouchableOpacity
  onPress={() => {}}
  activeOpacity={0.8}
  className='flex flex-row items-center w-full pb-4 border-b border-neutral-100 dark:border-dark-300'>
  <View className='flex flex-row items-center gap-x-3 w-full'>
    <Ionicons name='sunny' color={'#A3A3A3'} size={24} />
    <Text className='text-neutral-400 font-kufi-medium'>{settings.themeLabel}</Text>
  </View>
</TouchableOpacity>
  */
}
<TouchableOpacity
  onPress={() => setopenLanguage(true)}
  activeOpacity={0.8}
  className='flex flex-row items-center w-full '>
  <View className='flex flex-row items-center gap-x-3 w-full'>
  <Languages size={24} color={'#A3A3A3'}/>
    <Text className='text-neutral-400 font-kufi-medium'>{settings.languageLabel}</Text>
  </View>
</TouchableOpacity>

</View>
      </CardLayout>
   </View>

      <View>
      <CardLayout>
       <View className='space-y-4'>

<TouchableOpacity
  onPress={() => router.push('../../report')}
  activeOpacity={0.8}
  className='flex flex-row items-center w-full pb-4 border-b border-neutral-100 dark:border-dark-300'>
  <View className='flex flex-row items-center gap-x-3 w-full'>
  <AlertTriangle size={24} color={'#A3A3A3'}/>
    <Text className='text-neutral-400 font-kufi-medium'>{settings.report}</Text>
  </View>
  <MaterialIcons name='arrow-forward-ios' color={'#A3A3A3'} size={24} />
</TouchableOpacity>

<TouchableOpacity
  onPress={() => router.push('../../faq')}
  activeOpacity={0.8}
  className='flex flex-row items-center w-full pb-4 border-b border-neutral-100 dark:border-dark-300'>
  <View className='flex flex-row items-center gap-x-3 w-full'>
  <MessageCircleQuestion size={24} color={'#A3A3A3'}/>
    <Text className='text-neutral-400 font-kufi-medium'>{settings.faq}</Text>
  </View>
  <MaterialIcons name='arrow-forward-ios' color={'#aaa'} size={24} />
</TouchableOpacity>

<TouchableOpacity 
activeOpacity={0.8} 
onPress={() => setOpen(true)}
className='flex flex-row items-center  space-x-2 '>
  <LogOut size={24} color={'#ef4444'}/>
  <Text className='text-red-500 font-kufi-semi-bold'>{settings.logout}</Text>
</TouchableOpacity>

</View>
       </CardLayout>

      </View>
      </PageLayout>

      <ConfirmModal
        title={settings.logoutConfirmTitle}
        description={settings.logoutConfirmDesc}
        onChange={logout}
        open={open}
        setOpen={setOpen} />

      <LanguageDrawer open={openLanguage} setOpen={setopenLanguage} />

    </>
  );
};

export default SettingsScreen;
