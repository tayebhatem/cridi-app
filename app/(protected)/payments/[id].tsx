import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import PageHeader from '@/components/ui/PageHeader';
import PaymentsCard from '@/components/payments/PaymentsCard';
import PageLayout from '@/components/ui/PageLayout';

const PayementsScreen = () => {
  const {id}=useLocalSearchParams();
  return (
  <PageLayout>
      <PageHeader title='Payments'/>
   
   <View className=''>
  <PaymentsCard id={id as string}/>
   </View>
  </PageLayout>
  )
}

export default PayementsScreen