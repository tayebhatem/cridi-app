import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import useLanguageStore from '@/stores/useLanguageStore'

const StoreNavigations = ({id}:{id:string}) => {
  const router=useRouter()
  const {language}=useLanguageStore()
  return (
    <View className='flex flex-row items-center gap-x-6 '>

    <View className='flex justify-center items-center'>
    <TouchableOpacity 
    onPress={()=>router.push(`../debts/${id}`)}
    activeOpacity={0.8} 
    className='p-3 w-12 h-12 flex items-center justify-center rounded-full bg-green-100'>
    <Ionicons  name='receipt-outline' size={24} color={'#16a34a'}/>
    </TouchableOpacity>
    <Text className='font-kufi text-center text-green-600'>
      {language?.id==='en'?"Debts":language?.id==='fr'?"Crédits":"الديون"}
    </Text>
    </View >

    <View className='flex justify-center items-center'>
    <TouchableOpacity 
     onPress={()=>router.push(`../payments/${id}`)}
     activeOpacity={0.8} 
    className='p-3 w-12 h-12 flex items-center justify-center  rounded-full bg-pink-100 text-pink-600'>
    <MaterialIcons name="currency-exchange" size={24} color="#db2777" />
    </TouchableOpacity>
    <Text className='font-kufi text-center text-pink-600'>
    {language?.id==='en'?"Payments":language?.id==='fr'?"Paiements":"الدفعات"}
    </Text>
    </View>

    <View className='flex justify-center items-center opacity-50'>
    <TouchableOpacity 
    disabled={true}
    activeOpacity={0.8} 
    className='p-3 w-12 h-12 flex items-center justify-center  rounded-full bg-blue-100 text-blue-600 '>
    <Ionicons name='chatbubble-ellipses-outline' size={24} color={'#2563eb'}/>
    </TouchableOpacity>
    <Text className='font-kufi text-center text-blue-600'>
    {language?.id==='en'?"Contact":language?.id==='fr'?"Contact":"تواصل"}
    </Text>
    </View>
     </View>
  )
}

export default StoreNavigations