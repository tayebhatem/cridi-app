import { View, Text, TouchableOpacity, useColorScheme } from 'react-native';
import React, { useState } from 'react';
import {  useRouter } from 'expo-router';
import {  FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { deleteSession } from '@/libs/appwrite';
import ConfirmModal from '@/components/ui/ConfirmModal';
import PageHeader from '@/components/ui/PageHeader';
import PageLayout from '@/components/ui/PageLayout';
import LanguageDrawer from '@/components/ui/LanguageDrawer';

import { settingsTranslation } from '@/constants/translation';
import useLanguageStore from '@/stores/useLanguageStore';
import CardLayout from '@/components/ui/CardLayout';
import { useChatContext } from 'stream-chat-expo';

const SettingsScreen = () => {
  const router = useRouter();
 
  const [open, setOpen] = useState(false);
  const [openLanguage, setopenLanguage] = useState(false);
  const theme=useColorScheme()
  const {client}=useChatContext()
  const { language } = useLanguageStore();
  const settings = settingsTranslation(language);
  const logout = async () => {
    try {
      const response = await deleteSession();
      if (response) {
        client.disconnectUser()
        router.replace('/auth/sign-in');
        setOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggleTheme=()=>{

  }
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
    <FontAwesome name='user' color={'#aaa'} size={24} />
    <Text className='text-neutral-400 font-kufi-medium'>{settings.account}</Text>
  </View>
  <MaterialIcons name='arrow-forward-ios' color={'#A3A3A3'} size={24} />
</TouchableOpacity>

<TouchableOpacity
  onPress={() => router.push('../../password')}
  activeOpacity={0.8}
  className='flex flex-row items-center justify-between w-full pb-4 border-b border-neutral-100 dark:border-dark-300'>
  <View className='flex flex-row items-center gap-x-3 w-full'>
    <FontAwesome name='lock' color={'#A3A3A3'} size={24} />
    <Text className='text-neutral-400 font-kufi-medium'>{settings.password}</Text>
  </View>
  <MaterialIcons name='arrow-forward-ios' color={'#A3A3A3'} size={24} />
</TouchableOpacity>

<TouchableOpacity
  onPress={() => router.push('../../notifications')}
  activeOpacity={0.8}
  className='flex flex-row items-center w-full pb-4 border-b border-neutral-100 dark:border-dark-300'>
  <View className='flex flex-row items-center gap-x-3 w-full'>
    <FontAwesome name='bell' color={'#A3A3A3'} size={24} />
    <Text className='text-neutral-400 font-kufi-medium'>{settings.notifications}</Text>
  </View>
  <MaterialIcons name='arrow-forward-ios' color={'#aaa'} size={24} />
</TouchableOpacity>

<TouchableOpacity
  onPress={() => setopenLanguage(true)}
  activeOpacity={0.8}
  className='flex flex-row items-center w-full'>
  <View className='flex flex-row items-center gap-x-3 w-full'>
    <FontAwesome name='globe' color={'#A3A3A3'} size={24} />
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
    <FontAwesome name='warning' color={'#aaa'} size={24} />
    <Text className='text-neutral-400 font-kufi-medium'>{settings.report}</Text>
  </View>
  <MaterialIcons name='arrow-forward-ios' color={'#A3A3A3'} size={24} />
</TouchableOpacity>

<TouchableOpacity
  onPress={() => router.push('../../faq')}
  activeOpacity={0.8}
  className='flex flex-row items-center w-full pb-4 border-b border-neutral-100 dark:border-dark-300'>
  <View className='flex flex-row items-center gap-x-3 w-full'>
    <FontAwesome name='question' color={'#A3A3A3'} size={24} />
    <Text className='text-neutral-400 font-kufi-medium'>{settings.faq}</Text>
  </View>
  <MaterialIcons name='arrow-forward-ios' color={'#aaa'} size={24} />
</TouchableOpacity>

<TouchableOpacity 
activeOpacity={0.8} 
onPress={() => setOpen(true)}
className='flex flex-row items-center  space-x-2 '>
  <FontAwesome name='sign-out' color={'#ef4444'} size={24} />
  <Text className='text-red-500 font-kufi-medium'>{settings.logout}</Text>
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
