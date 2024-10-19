
import { router, useLocalSearchParams } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Channel, MessageInput, MessageList, useChatContext,ChannelAvatar, ChannelPreviewTitle, useChannelContext, useMessagesContext } from 'stream-chat-expo'
import { Channel as ChannelType } from 'stream-chat';
import Loader from '@/components/ui/Loader';
import { Text, useColorScheme, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import useAccountStore from '@/stores/useAccountStore';
import TimeAgo from '@/components/ui/TimeAgo';
const ConversationScreen = () => {
    const {id}=useLocalSearchParams<{id:string}>()
     const [channel, setChannel] = useState<ChannelType | null>()
     const theme=useColorScheme()
     const {client}=useChatContext()
     const {account}=useAccountStore()
     
     const filter = {cid:id};
    useEffect(() => {
        const fetchChannel=async()=>{
            const res=await client.queryChannels(filter)
           
           setChannel(res[0])
         
          }
          fetchChannel()
       
    }, []);

    if(!channel) return<Loader/>
  return (
   <SafeAreaView className='bg-white h-full'>
     <View className='p-4 flex flex-row justify-between'>
        <View className='flex flex-row items-center space-x-3'>
        <ChannelAvatar channel={channel}/>
       <View>
       <Text className='text-lg font-medium'>
          {Object.values(channel.state.members).find(member => member.user?.id !== account?.id)?.user?.name}
        </Text>
      <View className='py-1'>
      {
        Object.values(channel.state.members).find(member => member.user?.id !== account?.id)?.user?.online ?  
        <Text className='text-neutral-400 font-kufi text-xs text-left'>
        Online
        </Text>:
          <TimeAgo date={Object.values(channel.state.members).find(member => member.user?.id !== account?.id)?.user?.last_active?.toString() as string}/>
        }
      </View>
       
       
       </View>
        </View>
        <TouchableOpacity activeOpacity={0.8} onPress={()=>router.back()}>
       <AntDesign name='arrowleft' size={28} color={theme==='light'?"#000":"#FFF"}/>
       </TouchableOpacity>
    </View>
 <View className='h-full w-full flex-1'>
   
      <Channel channel={channel} audioRecordingEnabled   >
    <MessageList/>
    <MessageInput/>
   </Channel>
      </View>
   </SafeAreaView>
  )
}

export default ConversationScreen