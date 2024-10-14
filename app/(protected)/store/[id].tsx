import { View, ScrollView } from 'react-native'
import React from 'react'
import {  useLocalSearchParams, useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import LastDebtsCard from '@/components/debts/LastDebtsCard'
import StoreHeader from '@/components/store/StoreHeader'
import StoreHero from '@/components/store/StoreHero'
import LastPaymentsCard from '@/components/payments/LastPaymentsCard'
import PageLayout from '@/components/ui/PageLayout'


const StoreScreen = () => {
  const {id}=useLocalSearchParams();
  
  return (
  
<PageLayout>
<StoreHeader id={id as string}/>

<ScrollView 
className='space-y-4' 
showsHorizontalScrollIndicator={false} 
showsVerticalScrollIndicator={false}
>

<StoreHero id={id as string}/>

<View>
<LastDebtsCard id={id as string}/>
</View>
<View>
 <LastPaymentsCard id={id as string}/>
</View>
</ScrollView>
</PageLayout>
  )
}

export default StoreScreen