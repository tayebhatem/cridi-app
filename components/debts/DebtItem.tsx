import { View, Text } from 'react-native'
import React from 'react'
import { DebtsType } from '@/types'
import { Ionicons } from '@expo/vector-icons'

const DebtItem = ({debt}:{debt:DebtsType}) => {
  return (
    <View key={debt.id} className='flex flex-row justify-between my-2 '>
    <View className='space-y-2'>
    <Text className='text-xl font-normal'>{debt.amount}.00 DA</Text>
   <View className='flex flex-row items-center space-x-2'>
  
   <View className='flex flex-row items-center space-x-2' >
  <Ionicons name='calendar-clear-outline' color={'#a3a3a3'} size={14}/>
   <Text className='text-neutral-400'>{debt.date}</Text>
   </View>
  
   <View className='flex flex-row items-center space-x-2' >
   <Ionicons name='time-outline' color={'#a3a3a3'} size={14}/>
   <Text className='text-neutral-400'>{debt.time}</Text>
   </View>
   
   </View>
    </View>
    <Text className={`rounded-md p-2 self-start font-medium capitalize ${debt.archived ?"bg-green-50 text-green-500":"bg-red-50 text-red-500"}`}>
      {debt.archived ? "paid":"unpaid"}
    </Text>
      </View>
  )
}

export default DebtItem