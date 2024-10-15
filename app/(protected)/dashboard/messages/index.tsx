import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import PageHeader from '@/components/ui/PageHeader'
import useLanguageStore from '@/stores/useLanguageStore'

const MessagesScreen = () => {
  const {language}=useLanguageStore()
  return (
   <SafeAreaView className='h-full p-4 bg-white'>
    <PageHeader title={language?.id==='en'?"Messages":language?.id==='fr'?"Messages":"الرسائل"}/>
   </SafeAreaView>
  )
}

export default MessagesScreen