import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { PaymentsType } from '@/types'
import { getPayments } from '@/actions/payments'
import { Link } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import useLanguageStore from '@/stores/useLanguageStore'
import CardLayout from '../ui/CardLayout'
import PaymentItem from './PaymentItem'

const LastPaymentsCard = ({id}:{id:string}) => {
  const [lastPayments, setLastPayments] = useState<PaymentsType[] | undefined>([])
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
  <Text className='text-lg font-kufi-medium  text-black dark:text-white '>
    {language?.id==='en'?"Last payments":language?.id==='fr'?"Derniers paiements":"الدفعات الأخيرة"}
  </Text>
  <Link href={`../payments/${id}`} className='capitalize text-primary-500 font-kufi-medium '>
  {language?.id==='en'?"Read more":language?.id==='fr'?"En savoir plus":"إقرأ المزيد"}
  </Link>
</View>
<View>
<CardLayout>
{
 lastPayments && lastPayments?.length>0 ? lastPayments.map((item)=>(
    <PaymentItem key={item.id} paymnet={item}/>
  )):
 <View >
  <Text className='text-neutral-400  text-center  align-middle font-kufi'>
      {language?.id==='en'?"No payments are found.":language?.id==='fr'?"Aucune paiements n'est trouvée.":"لم يتم العثور على مدفوعات."}
        </Text>
 </View>
   }
</CardLayout>
</View>
    </View>
  )
}

export default LastPaymentsCard