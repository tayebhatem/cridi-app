import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { AccountUserType, StoreType } from '@/types'
import { useRouter } from 'expo-router'
import Avatar from '../ui/Avatar'
import CardLayout from '../ui/CardLayout'

const StoreItem = ({store}:{store:StoreType}) => {
    const router=useRouter()
   
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={()=> router.push(`../store/${store.id}`)} className=''>
   <CardLayout>
   <View className='flex items-center'>
     <Avatar size='Medium' url={store.avatar} uplaod/>
    <View>
    <Text className='font-medium text-base text-black dark:text-white text-center'>{store.name}</Text>
    <Text className='text-neutral-400 text-center text-sm'>{store.adress}</Text>
    <Text className='text-neutral-400 text-center text-sm'>{store.phone}</Text>
    </View>
     </View>
   </CardLayout>

    
    </TouchableOpacity>
  )
}

export default StoreItem