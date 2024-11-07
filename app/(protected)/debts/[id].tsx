import { View, Text, ScrollView, TouchableOpacity, RefreshControl, FlatList } from 'react-native'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import DebtsCard from '@/components/debts/DebtsCard'
import PageHeader from '@/components/ui/PageHeader'
import useDebtsStore from '@/stores/useDebtsStore'
import PageLayout from '@/components/ui/PageLayout'
import useLanguageStore from '@/stores/useLanguageStore'
import { getDebsts } from '@/actions/debts'
import { DebtsType } from '@/types'
import DebtItem from '@/components/debts/DebtItem'
import CardLayout from '@/components/ui/CardLayout'
import {format, formatDate} from 'date-fns'
import TotaleCard from '@/components/debts/TotaleCard'
import EmptyList from '@/components/ui/EmptyList'
const DebtsScreen = () => {
  const {id}=useLocalSearchParams();
  
  const {language}=useLanguageStore()
  const [data, setData] = useState<DebtsType[] | undefined>([])
  const [debts, setDebts] = useState<DebtsType[] | undefined>([])
    const [isLoading, setIsLoading] = useState(false)
    const [range, setRange] = useState(1)
    const filterDateData=[
      {
        id:1,
        name:{
          en:'All',
          fr:'Tous',
          ar:'الكل'
        }
      },
      {
        id:2,
        name:{
          en:'Week',
          fr:'Semain',
          ar:'أسبوع'
        }
      },
      {
        id:3,
        name:{
          en:'2 Weeks',
          fr:'2 Semains',
          ar:'أسبوعين'
        }
      },
      {
        id:4,
        name:{
          en:'Month',
          fr:'Mois',
          ar:'شهر'
        }
      },
    ]
    const totalDebts=useMemo(()=>{
      const total=debts?.filter(item=>item.archived===false).reduce((total,item)=>{
        return total+item.amount
        },0)

        return total
    },[debts])
    const fetchDebts=useCallback(async()=>{
        setIsLoading(true)
      try {
        const data=await getDebsts(id as string,80)
        setDebts(data)
        setData(data)
        setRange(1)
      } catch (error) {
        
      }finally{
        setIsLoading(false)
      }
},[])
    useEffect(() => {
   
     fetchDebts()
    }, [])

    const selectDateRange=(range:number)=>{
      setRange(range)
      const currentDate=new Date()
      if(range===1){
       
     setDebts(data)

      }else if(range===2){
        const newDate=new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000)
        const date =formatDate(newDate, "yyyy-MM-dd");
       const filterData=data?.filter(item=>item.date>date)
       setDebts(filterData)
      }else if(range===3) {
        const twoWeeksAgo = new Date(currentDate.setDate(currentDate.getDate() - 14));
        const date =formatDate(twoWeeksAgo, "yyyy-MM-dd");
       const filterData=data?.filter(item=>item.date>date)
       setDebts(filterData)
      }else {
        const oneMonthAgo = new Date(currentDate);
        oneMonthAgo.setMonth(currentDate.getMonth() - 1);
        const date =formatDate(oneMonthAgo, "yyyy-MM-dd");
        const filterData=data?.filter(item=>item.date>date)
        setDebts(filterData)
      }
    }


  return (
    <PageLayout>
        <PageHeader title={language?.id==='en'?"Debts":language?.id==='fr'?"Crédits":"الديون"}/>
  <View>
  <TotaleCard total={totalDebts} subText={language?.id==='en'?"Total debts":language?.id==='fr'?"Crédits totales":"إجمالي الديون"}/>
  </View>
   <View className='space-y-4'>
    <View className='flex flex-row items-center'>
     {
      filterDateData.map((item)=>(
        <TouchableOpacity 
        onPress={()=>selectDateRange(item.id)}
        key={item.id} 
        activeOpacity={0.8} 
        className={` px-6 rounded-full shadow-primary-500 shadow-md ${item.id===range && 'bg-white dark:bg-dark-400'}`}>
        <Text className={`font-kufi-medium  ${item.id===range?'text-black dark:text-white':'text-neutral-400'}`}>{
          language?.id==='en'?item.name.en:language?.id==='fr'?item.name.fr:item.name.ar
          }</Text>
      </TouchableOpacity>
      ))
     }
    </View>
  <View className=''>
  <CardLayout>
   <FlatList
  
   showsVerticalScrollIndicator={false}
   data={debts}
   keyExtractor={item=>item.id}
  className='h-[90%]'
   renderItem={(item)=><DebtItem debt={item.item}/>}
   contentContainerStyle={{marginVertical:debts && debts?.length===0?'auto':0}}
   refreshControl={
    <RefreshControl refreshing={isLoading} onRefresh={fetchDebts}/>
   }
   ListEmptyComponent={()=>(
    <EmptyList
    title={
      language?.id === 'en'
        ? "There is no debt currently"
        : language?.id === 'fr'
        ? "Il n'y a pas de dette actuellement"
        : "لا يوجد ديون حاليا"
    }
    subText={
      language?.id === 'en'
        ? "You have no outstanding debts at the moment."
        : language?.id === 'fr'
        ? "Aucune dette en cours pour le moment."
        : "لا توجد ديون مستحقة في الوقت الحالي."
    }
  />
   )}
   />
   </CardLayout>
  </View>

   </View>
    </PageLayout>
  )
}

export default DebtsScreen