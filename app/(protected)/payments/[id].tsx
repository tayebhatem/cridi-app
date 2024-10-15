import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import PageHeader from '@/components/ui/PageHeader';
import PaymentsCard from '@/components/payments/PaymentsCard';
import PageLayout from '@/components/ui/PageLayout';
import useLanguageStore from '@/stores/useLanguageStore';

const PayementsScreen = () => {
  const {id}=useLocalSearchParams();
  const {language}=useLanguageStore()
  return (
  <PageLayout>
      <PageHeader title= {language?.id==='en'?"Payments":language?.id==='fr'?"Paiements":"الدفعات"}/>
   
   <View className=''>
  <PaymentsCard id={id as string}/>
   </View>
  </PageLayout>
  )
}

export default PayementsScreen