import { View, Text, FlatList, RefreshControl } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { PaymentsType } from '@/types'
import { getPayments } from '@/actions/payments'
import PaymentItem from './PaymentItem'
import useLanguageStore from '@/stores/useLanguageStore'
import EmptyList from '../ui/EmptyList'

const PaymentsCard = ({id}:{id:string}) => {
    const [payments, setPayments] = useState<PaymentsType[] | undefined>([])
    const [isLoading, setIsLoading] = useState(false)
    const {language}=useLanguageStore()
    const fetchPayments=useCallback(async()=>{
        setIsLoading(true)
        try {
            const data=await getPayments(id as string,25)
            setPayments(data)
          } catch (error) {
            console.log(error)
          }finally{
            setIsLoading(false)
          }
   },[])
  useEffect(() => {
    
   fetchPayments()
  }, [])

  return (
    <View className='space-y-4'>
   
     <View className='bg-white p-4 mb-8 flex justify-center  rounded-md shadow-primary-500 shadow-md'>
   <FlatList
    className='h-full'
    
   showsVerticalScrollIndicator={false}
   data={payments}
   keyExtractor={item=>item.id}
   renderItem={(item)=> <PaymentItem paymnet={item.item}/>}
   refreshControl={
    <RefreshControl refreshing={isLoading} onRefresh={fetchPayments}/>
   }
   contentContainerStyle={{marginVertical:payments && payments?.length===0?'auto':0}}
   ListEmptyComponent={()=>(
    <EmptyList
    title={
      language?.id === 'en'
        ? "No payments available"
        : language?.id === 'fr'
        ? "Aucun paiement disponible"
        : "لا توجد مدفوعات متاحة"
    }
    subText={
      language?.id === 'en'
        ? "You have no payment records at the moment."
        : language?.id === 'fr'
        ? "Vous n'avez aucun enregistrement de paiement pour le moment."
        : "لا توجد سجلات مدفوعات في الوقت الحالي."
    }
  />
  
   )}
   />
</View>
   </View>
  )
}

export default PaymentsCard