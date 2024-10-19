import { View, Text } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { PaymentsType } from '@/types'

const PaymentItem = ({paymnet}:{paymnet:PaymentsType}) => {
  return (
    <View key={paymnet.id} className='flex flex-row justify-between my-2 '>
    <View className='space-y-2'>
    <Text className='text-xl font-normal text-black dark:text-white'>{paymnet.amount}.00 DA</Text>
   <View className='flex flex-row items-center space-x-2'>
  
   <View className='flex flex-row items-center space-x-2' >
  <Ionicons name='calendar-clear-outline' color={'#a3a3a3'} size={14}/>
   <Text className='text-neutral-400'>{paymnet.date}</Text>
   </View>
  
   <View className='flex flex-row items-center space-x-2' >
   <Ionicons name='time-outline' color={'#a3a3a3'} size={14}/>
   <Text className='text-neutral-400'>{paymnet.time}</Text>
   </View>
   
   </View>
    </View>
   
      </View>
  )
}

export default PaymentItem