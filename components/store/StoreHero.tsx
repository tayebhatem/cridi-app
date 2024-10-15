import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import StoreNavigations from './StoreNavigations'
import useDebtsStore from '@/stores/useDebtsStore'
import { getTotalDebts } from '@/actions/debts'
import useLanguageStore from '@/stores/useLanguageStore'

const StoreHero = ({id}:{id:string}) => {
     const {totalDebts,setTotalDebts}=useDebtsStore()
     const{language}=useLanguageStore()
     useEffect(() => {
      const fetchTotalDebts=async()=>{
                  try {
                    const total=await getTotalDebts(id)
                    if(!total) return
                    setTotalDebts(total)

                  } catch (error) {
                    console.log(error)
                  }
      }
      fetchTotalDebts()
     }, [])
     
  return (
    <View className=' bg-white p-3 rounded-md shadow-primary-500 shadow-md space-y-4'>

    <View className='flex flex-row items-center justify-between'>
    <View>
     <Text className='text-4xl font-medium'>{totalDebts}.00 DA</Text>
     <Text className=' text-left font-kufi'>
     {language?.id==='en'?"Total debts":language?.id==='fr'?"Crédits totales":"إجمالي الديون"}
     </Text>
     </View>
    </View>
   
   <View>
   <StoreNavigations id={id as string}/>
   </View>
    
   </View>
  )
}

export default StoreHero