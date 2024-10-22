import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import PageHeader from '@/components/ui/PageHeader'
import useLanguageStore from '@/stores/useLanguageStore'
import { ChannelList, useChatContext ,Channel as ChannelType} from "stream-chat-expo"
import useAccountStore from '@/stores/useAccountStore'
import { router } from 'expo-router'
import Loader from '@/components/ui/Loader'
const MessagesScreen = () => {
  const {language}=useLanguageStore()
 const {account}=useAccountStore()
 const{client}=useChatContext()
 const [filteredChannels, setFilteredChannels] = useState<any>(null);
 const [loading, setLoading] = useState(true);

 if (!account) return null;

 useEffect(() => {
   const fetchChannels = async () => {
     const filter = { members: { $in: [account.id] } };
     const channels = await client.queryChannels(filter);

     // Filter out channels that have zero messages
     const nonEmptyChannels = channels.filter(channel => channel.state.messages.length > 0);
     setFilteredChannels(nonEmptyChannels);
     setLoading(false);
   };

   fetchChannels();
 }, [account, client]);

 if (loading) return <Loader />; 
 
  return (
   <SafeAreaView className='h-full  bg-white dark:bg-dark-500 py-4'>
   <View className='p-2 '>
  <Text className='text-lg font-kufi-medium text-left'>
  {language?.id==='en'?"Messages":language?.id==='fr'?"Messages":"الرسائل"}
  </Text>
   </View>
   
    <ChannelList  
    
    filters={{members:{$in:[account.id]},last_message_at:{$exists:true}}}
    onSelect={(channel)=>router.push(`../../conversation/${channel.cid}`)}
    />
   </SafeAreaView>
  )
}

export default MessagesScreen