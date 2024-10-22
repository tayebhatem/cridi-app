import { View, ScrollView } from 'react-native'
import React from 'react'
import Header from '@/components/dashboard/Header';
import Hero from '@/components/dashboard/Hero';
import PageLayout from '@/components/ui/PageLayout';
import LastStoresCard from '@/components/store/LastStoresCard';
const HomeScreen = () => {
  
  return (
   <PageLayout>
        <Header/>
     <ScrollView className='space-y-4' showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
    
 <Hero/>   
<View>
<LastStoresCard/>
</View>
     </ScrollView>
   </PageLayout>
  )
}

export default HomeScreen