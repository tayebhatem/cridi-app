import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link } from 'expo-router'
import { DebtsType } from '@/types'
import { getDebsts } from '@/actions/debts'
import { Ionicons } from '@expo/vector-icons'
import DebtItem from './DebtItem'


const LastDebtsCard = ({id}:{id:string}) => {
    const [lastDebts, setLastDebts] = useState<DebtsType[] | undefined>([])
useEffect(() => {
    const fetchLastDebts=async()=>{
        if(id){
         try {
           const data=await getDebsts(id as string,3)
           setLastDebts(data)
         } catch (error) {
           
         }
        }
 }
 fetchLastDebts()
}, [])

  return (
    <View className='space-y-2'>
     <View className='flex flex-row items-center justify-between'>
  <Text className='text-lg font-medium '>Last debts</Text>
  <Link href={`../debts/${id}`} className='capitalize text-base font-medium'>
  read more
  </Link>
</View>
<View className='bg-white p-4  rounded-md shadow-primary-500 shadow-md'>
   {
  lastDebts?   lastDebts.map((item)=>(
   <DebtItem debt={item} key={item.id}/>
  )):
 <View >

<Text className='text-neutral-400 text-center w-full'>No debts are founded</Text>

 </View>
   }
</View>
    </View>
  )
}

export default LastDebtsCard