import { View, Text, Image, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import useAccountStore from '@/stores/useAccountStore'

import Header from '@/components/dashboard/Header';
import { Link } from 'expo-router';
import StorsCard from '@/components/dashboard/StorsCard';
import Hero from '@/components/dashboard/Hero';
import PageLayout from '@/components/ui/PageLayout';
const HomeScreen = () => {
  const {account}=useAccountStore()

  return (
   <PageLayout>
        <Header/>
     <ScrollView className='space-y-4' showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
    
 <Hero/>   
    <View>
      <View className='flex flex-row items-center justify-between'>
        <Text className='text-2xl font-medium'>My stors</Text>
        <Link href='../../stores' className='text-primary-500 font-medium text-base'>
        Read more
      
        </Link>
      </View>
     <StorsCard/>
    
    </View>
     </ScrollView>
   </PageLayout>
  )
}

export default HomeScreen