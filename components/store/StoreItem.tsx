import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { AccountUserType, StoreType } from '@/types'
import { useRouter } from 'expo-router'
import Avatar from '../ui/Avatar'
import CardLayout from '../ui/CardLayout'
import { MaterialIcons } from '@expo/vector-icons'

const StoreItem = ({store}:{store:StoreType}) => {
    const router=useRouter()
   
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={()=> router.push(`../store/${store.id}`)} className=''>
   <CardLayout>
   <View className='flex items-center'>
     <Avatar size='Medium' url={store.avatar} uplaod/>
    <View>
    <Text className='font-medium text-base text-black dark:text-white text-center'>{store.name}</Text>
 <View>
 {
    store.adress &&  <View className="flex flex-row justify-center items-center space-x-1">
    <MaterialIcons name="location-pin" color={"#A3A3A3"} size={14} />
   <Text className='text-neutral-500 text-xs'>{store.adress}</Text>  
</View>
   }
  {
    store.phone &&   <View className="flex flex-row justify-center items-center space-x-1">
    <MaterialIcons name="phone" color={"#A3A3A3"} size={14} />
    <Text className="text-neutral-500 text-xs">{store.phone}</Text>
</View>
  }
 </View>
    </View>
     </View>
   </CardLayout>

    
    </TouchableOpacity>
  )
}

export default StoreItem