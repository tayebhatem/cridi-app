import { View, Text, FlatList, RefreshControl } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { PaymentsType } from '@/types'
import { getPayments } from '@/actions/payments'
import PaymentItem from './PaymentItem'

const PaymentsCard = ({id}:{id:string}) => {
    const [payments, setPayments] = useState<PaymentsType[] | undefined>([])
    const [isLoading, setIsLoading] = useState(false)
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
   showsVerticalScrollIndicator={false}
   data={payments}
   keyExtractor={item=>item.id}
   renderItem={paymentItems}
   refreshControl={
    <RefreshControl refreshing={isLoading} onRefresh={fetchPayments}/>
   }
   ListEmptyComponent={()=>(
    <Text className='text-neutral-400 text-center  align-middle'>No debts are found.</Text>
   )}
   />
</View>
   </View>
  )
}

export default PaymentsCard