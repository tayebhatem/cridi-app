import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import PageHeader from '@/components/ui/PageHeader';
import PaymentsCard from '@/components/payments/PaymentsCard';
import PageLayout from '@/components/ui/PageLayout';
import useLanguageStore from '@/stores/useLanguageStore';
import { markAllasRead } from '@/actions/notifications';

const PayementsScreen = () => {
  const {id}=useLocalSearchParams();
  const {language}=useLanguageStore()
  useEffect(() => {
    const updateUnreadDebts=async()=>{
       try {
        await markAllasRead(id as string,'payment')
  
       } catch (error) {
        
       }
    }
    updateUnreadDebts()
  }, [])
  return (
  <PageLayout>
      <PageHeader title= {language?.id==='en'?"Payments":language?.id==='fr'?"Paiements":"الدفعات"}/>
   
   <View >
  <PaymentsCard id={id as string}/>
   </View>
  </PageLayout>
  )
}

export default PayementsScreen