import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import DebtsCard from '@/components/debts/DebtsCard'
import PageHeader from '@/components/ui/PageHeader'
import useDebtsStore from '@/stores/useDebtsStore'
import PageLayout from '@/components/ui/PageLayout'
import useLanguageStore from '@/stores/useLanguageStore'

const DebtsScreen = () => {
  const {id}=useLocalSearchParams();
  const {totalDebts}=useDebtsStore();
  const {language}=useLanguageStore()
  return (
    <PageLayout>
        <PageHeader title={language?.id==='en'?"Debts":language?.id==='fr'?"Crédits":"الديون"}/>
   <View className=''>
   <View className='bg-pink-200 p-2 rounded-md space-y-2 '>
      <Text className='text-2xl text-pink-800 font-medium'>{totalDebts}.00 DA</Text>
      <Text className='text-pink-800 text-left font-kufi'>
        {language?.id==='en'?"Total debts":language?.id==='fr'?"Crédits totales":"إجمالي الديون"}
      </Text>
    </View>
   
   </View>
   <View className='h-full'>
   <DebtsCard id={id as string}/>
   </View>
    </PageLayout>
  )
}

export default DebtsScreen