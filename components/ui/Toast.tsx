import { View, Text, Modal } from 'react-native'
import React, { useEffect } from 'react'
import { FontAwesome } from '@expo/vector-icons';
import useLanguageStore from '@/stores/useLanguageStore';
import { Card } from 'tamagui';

const Toast = ({type, description}: { type: 'SUCCESS' | 'WARNING', description: string }) => {
  const { language } = useLanguageStore();

 



  return (
    <Card className="p-3 flex flex-row items-center gap-x-3 w-full" elevate>
    {type === 'SUCCESS' 
      ? <FontAwesome name="check-circle" size={32} color="#22c55e" />
      : <FontAwesome name="warning" size={32} color="#ef4444" />
    }
    <View>
      <Text className="text-lg text-black dark:text-white font-kufi-medium leading-9">
        {type === 'SUCCESS' 
          ? language?.id === 'en' ? 'Success' : language?.id === 'fr' ? 'Succès' : 'نجاح' 
          : language?.id === 'en' ? 'Error' : language?.id === 'fr' ? 'Erreur' : 'خطأ'}
      </Text>
      <Text className="font-kufi leading-6" numberOfLines={1}>
        {description}
      </Text>
    </View>
  </Card>
  );
}

export default Toast;
