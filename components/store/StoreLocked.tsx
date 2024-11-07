import { View, Text } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import useLanguageStore from '@/stores/useLanguageStore';
import Button from '../ui/Button';
import { router } from 'expo-router';
import { Fontisto } from '@expo/vector-icons';

const StoreLocked = () => {
  const { language } = useLanguageStore();

  // Define translations for each text element
  const translations = {
    title: {
      en: 'Store is locked',
      fr: 'Le magasin est verrouillé',
      ar: 'المتجر مغلق',
    },
    description: {
      en: 'Access to this store is temporarily restricted.',
      fr: 'L’accès à ce magasin est temporairement restreint.',
      ar: 'الوصول إلى هذا المتجر محدود مؤقتًا.',
    },
    button: {
      en: 'Back now',
      fr: 'Retour maintenant',
      ar: 'العودة الآن',
    },
  };
  

  return (
    <SafeAreaView className='bg-white dark:bg-dark-500 p-6 space-y-4 h-full items-center justify-center'>
      <View className='items-center space-y-6'>
      <Fontisto name="locked" size={40} color="#A3A3A3" />
       <View>
       <Text className='text-2xl font-kufi-medium text-center text-black dark:text-white'>
          {language && translations.title[language.id]}
        </Text>
        <Text className='text-center text-neutral-400 font-kufi leading-5'>
          {language && translations.description[language.id]}
        </Text>
       </View>
      </View>
     <View className='w-full'>
     <Button
        title={language && translations.button[language.id] || ''}
        onChange={async () => {
          router.back();
        }}
      />
     </View>
    </SafeAreaView>
  );
};

export default StoreLocked;
