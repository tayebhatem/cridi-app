import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { PaymentsType } from '@/types'
import { getPayments } from '@/actions/payments'
import { Link } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

const LastPaymentsCard = ({id}:{id:string}) => {
  const [LastPayments, setLastPayments] = useState<PaymentsType[] | undefined>([])
  useEffect(() => {
      const fetchLastDebts=async()=>{
          if(id){
           try {
             const data=await getPayments(id as string,3)
             setLastPayments(data)
           } catch (error) {
             
           }
          }
   }
   fetchLastDebts()
  }, [])
  
  return (
    <View className='space-y-2'>
     <View className='flex flex-row items-center justify-between'>
  <Text className='text-lg font-medium '>Last payments</Text>
  <Link href={`../payments/${id}`} className='capitalize text-base font-medium'>
  read more
  </Link>
</View>
<View className='bg-white p-4  rounded-md shadow-primary-500 shadow-md space-y-4 '>
   {
 LastPayments && LastPayments?.length>0 ? LastPayments.map((item)=>(
    <View key={item.id} className='flex flex-row justify-between'>
  <View className='space-y-2'>
  <Text className='text-xl font-normal'>{item.amount}.00 DA</Text>
 <View className='flex flex-row items-center space-x-2'>

 <View className='flex flex-row items-center space-x-2' >
<Ionicons name='calendar-clear-outline' color={'#a3a3a3'} size={14}/>
 <Text className='text-neutral-400'>{item.date}</Text>
 </View>

 <View className='flex flex-row items-center space-x-2' >
 <Ionicons name='time-outline' color={'#a3a3a3'} size={14}/>
 <Text className='text-neutral-400'>{item.time}</Text>
 </View>
 
 </View>

  </View>
 
    </View>
  )):
 <View >
<Text className='text-neutral-400 text-center w-full'>No payments are found.</Text>
 </View>
   }
</View>
    </View>
  )
}

export default LastPaymentsCard