import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { PaymentsType } from '@/types'
import { getPayments } from '@/actions/payments'
import { Link } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import useLanguageStore from '@/stores/useLanguageStore'

const LastPaymentsCard = ({id}:{id:string}) => {
  const [LastPayments, setLastPayments] = useState<PaymentsType[] | undefined>([])
  const {language}=useLanguageStore()
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
  <Text className='font-kufi-medium  '>
    {language?.id==='en'?"Last payments":language?.id==='fr'?"Derniers paiements":"الدفعات الأخيرة"}
  </Text>
  <Link href={`../payments/${id}`} className='capitalize text-primary-500 font-kufi-medium '>
  {language?.id==='en'?"Read more":language?.id==='fr'?"En savoir plus":"إقرأ المزيد"}
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
  <Text className='text-neutral-400  text-center  align-middle font-kufi'>
      {language?.id==='en'?"No payments are found.":language?.id==='fr'?"Aucune paiements n'est trouvée.":"لم يتم العثور على مدفوعات."}
        </Text>
 </View>
   }
</View>
    </View>
  )
}

export default LastPaymentsCard