import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import PageHeader from '@/components/ui/PageHeader'
import useLanguageStore from '@/stores/useLanguageStore'
import { ChannelList} from "stream-chat-expo"
import useAccountStore from '@/stores/useAccountStore'
import { router } from 'expo-router'
const MessagesScreen = () => {
  const {language}=useLanguageStore()
 const {account}=useAccountStore()
 if(!account) return null
  return (
   <SafeAreaView className='h-full  bg-white dark:bg-dark-500 py-4'>
   <View className='p-2 '>
  <Text className='text-lg font-kufi-medium text-left'>
  {language?.id==='en'?"Messages":language?.id==='fr'?"Messages":"الرسائل"}
  </Text>
   </View>
   
    <ChannelList  
    
    filters={{members:{$in:[account.id]}}}
    onSelect={(channel)=>router.push(`../../conversation/${channel.cid}`)}
    />
   </SafeAreaView>
  )
}

export default MessagesScreen