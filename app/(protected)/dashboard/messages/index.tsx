import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import PageHeader from '@/components/ui/PageHeader'

const MessagesScreen = () => {
  return (
   <SafeAreaView className='h-full p-4 bg-white'>
    <PageHeader title='Messages'/>
   </SafeAreaView>
  )
}

export default MessagesScreen