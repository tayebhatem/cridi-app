import { View, Text, FlatList, RefreshControl, TouchableOpacity } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { getDebsts } from '@/actions/debts'
import { DebtsType } from '@/types'
import { Ionicons } from '@expo/vector-icons'
import DebtItem from './DebtItem'

const filterDateData=[
  {
    id:1,
    name:'All'
  },
  {
    id:2,
    name:'Week'
  },
  {
    id:3,
    name:'Month'
  },
]


const DebtsCard = ({id}:{id:string}) => {
    const [debts, setDebts] = useState<DebtsType[] | undefined>([])
    const [isLoading, setIsLoading] = useState(false)
    const [range, setRange] = useState(1)
    const fetchDebts=useCallback(async()=>{
        setIsLoading(true)
      try {
        const data=await getDebsts(id as string,80)
        setDebts(data)
      } catch (error) {
        
      }finally{
        setIsLoading(false)
      }
},[])
    useEffect(() => {
   
     fetchDebts()
    }, [])

    const selectDateRange=(range:number)=>{
      if(range===1){
        
      }
    }

    
    const debtsItems=({item}:{item:DebtsType})=>(
      <DebtItem debt={item} key={item.id}/>
    )
  return (
   <View className='space-y-4'>
    <View className='flex flex-row items-center space-x-2'>
     {
      filterDateData.map((item)=>(
        <TouchableOpacity 
        onPress={()=>setRange(item.id)}
        key={item.id} 
        activeOpacity={0.8} 
        className={`py-2 px-8 rounded-full shadow-primary-500 shadow-md ${item.id===range && 'bg-white'}`}>
        <Text className={`font-medium ${item.id===range?'text-black':'text-neutral-400'}`}>{item.name}</Text>
      </TouchableOpacity>
      ))
     }
    </View>
     <View className='bg-white p-4  flex justify-center  rounded-md shadow-primary-500 shadow-md max-h-fit '>
   <FlatList
   showsVerticalScrollIndicator={false}
   data={debts}
   keyExtractor={item=>item.id}
   renderItem={debtsItems}
   refreshControl={
    <RefreshControl refreshing={isLoading} onRefresh={fetchDebts}/>
   }
   ListEmptyComponent={()=>(
    <Text className='text-neutral-400 text-center w-full h-full  align-middle'>No debts are found.</Text>
   )}
   />
</View>
   </View>
  )
}

export default DebtsCard