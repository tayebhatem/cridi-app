import { View, Text, TouchableOpacity, useColorScheme } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'
import { useRouter } from 'expo-router'

const PageHeader = ({title}:{title:string}) => {
    const router=useRouter()
    const theme=useColorScheme()
  return (
    <View className='flex flex-row items-center justify-between'>
    <Text className='font-kufi-semi-bold text-base text-black dark:text-white'>{title}</Text>
     
     <TouchableOpacity activeOpacity={0.8} onPress={()=>router.back()}>
       <AntDesign name='arrowleft' size={28} color={theme==='light'?"#000":"#FFF"}/>
       </TouchableOpacity>
       </View>
  )
}

export default PageHeader