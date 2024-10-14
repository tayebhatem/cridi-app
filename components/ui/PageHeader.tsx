import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'
import { useRouter } from 'expo-router'

const PageHeader = ({title}:{title:string}) => {
    const router=useRouter()
  return (
    <View className='flex flex-row items-center justify-between'>
    <Text className='text-xl font-medium'>{title}</Text>
     
     <TouchableOpacity activeOpacity={0.8} onPress={()=>router.back()}>
       <AntDesign name='arrowleft' size={28} />
       </TouchableOpacity>
       </View>
  )
}

export default PageHeader