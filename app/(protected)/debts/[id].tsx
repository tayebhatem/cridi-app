import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useLocalSearchParams } from 'expo-router'
import DebtsCard from '@/components/debts/DebtsCard'
import PageHeader from '@/components/ui/PageHeader'
import useDebtsStore from '@/stores/useDebtsStore'
import PageLayout from '@/components/ui/PageLayout'

const DebtsScreen = () => {
  const {id}=useLocalSearchParams();
  const {totalDebts}=useDebtsStore();
  return (
    <PageLayout>
        <PageHeader title='Debts'/>
   <View className=''>
   <View className='bg-pink-200 p-2 rounded-md space-y-2 '>
      <Text className='text-2xl text-pink-800 font-medium'>{totalDebts}.00 DA</Text>
      <Text className='text-pink-800'>Total debts</Text>
    </View>
   
   </View>
   <View className=''>
   <DebtsCard id={id as string}/>
   </View>
    </PageLayout>
  )
}

export default DebtsScreen