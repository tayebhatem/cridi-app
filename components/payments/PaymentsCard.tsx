import { View, Text, FlatList, RefreshControl } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { PaymentsType } from '@/types'
import { getPayments } from '@/actions/payments'
import PaymentItem from './PaymentItem'
import useLanguageStore from '@/stores/useLanguageStore'

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
            
          }finally{
            setIsLoading(false)
          }
   },[])
  useEffect(() => {
    
   fetchPayments()
  }, [])
  const paymentItems=({item}:{item:PaymentsType})=>(
       <PaymentItem paymnet={item}/>
  )
  return (
    <View className='space-y-4'>
   
     <View className='bg-white p-4 mb-8 flex justify-center  rounded-md shadow-primary-500 shadow-md'>
   <FlatList
    className='h-[100%] '
   showsVerticalScrollIndicator={false}
   data={payments}
   keyExtractor={item=>item.id}
   renderItem={paymentItems}
   refreshControl={
    <RefreshControl refreshing={isLoading} onRefresh={fetchPayments}/>
   }
   ListEmptyComponent={()=>(
    <View className=' h-full'>
      <Text className='text-neutral-400  text-center  align-middle font-kufi'>
      {language?.id==='en'?"No payments are found.":language?.id==='fr'?"Aucune paiements n'est trouvée.":"لم يتم العثور على مدفوعات."}
        </Text>
      </View>
   )}
   />
</View>
   </View>
  )
}

export default PaymentsCard