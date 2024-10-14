import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { AccountUserType } from '@/types'
import { AntDesign, FontAwesome } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import Avatar from '../ui/Avatar'

const StoreItem = ({store}:{store:AccountUserType}) => {
    const router=useRouter()
    const navigate=()=>{
        router.push(`../store/${store.id}`)
    }
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={()=> router.push(`../store/${store.id}`)} className='bg-white p-4 flex flex-row justify-between items-center rounded-md shadow-primary-500 shadow-md'>
     <View className='flex flex-row gap-x-3'>
     <Avatar size='Medium' url={store.store.avatar}/>
    <View>
    <Text className='text-lg font-medium'>{store.store.name}</Text>
    <Text className='text-[#aaa]'>{store.store.adress}</Text>
    <Text className='text-[#aaa]'>{store.store.phone}</Text>
    </View>
     </View>

     <TouchableOpacity activeOpacity={0.8}>
        <AntDesign name='message1' size={28} color={'#059669'} />
     </TouchableOpacity>
    </TouchableOpacity>
  )
}

export default StoreItem