import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link } from 'expo-router'
import { DebtsType } from '@/types'
import { getDebsts } from '@/actions/debts'
import { Ionicons } from '@expo/vector-icons'
import DebtItem from './DebtItem'
import useLanguageStore from '@/stores/useLanguageStore'


const LastDebtsCard = ({id}:{id:string}) => {
    const [lastDebts, setLastDebts] = useState<DebtsType[] | undefined>([])
    const{language}=useLanguageStore()
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
  <Text className=' font-kufi-medium '>
    {language?.id==='en'?"Last debts":language?.id==='fr'?"Dernières crédits":"آخر الديون"}
  </Text>
  <Link href={`../debts/${id}`} className='capitalize  font-kufi-medium text-primary-500'>
  {language?.id==='en'?"Read more":language?.id==='fr'?"En savoir plus":"إقرأ المزيد"}
  </Link>
</View>
<View className='bg-white p-4  rounded-md shadow-primary-500 shadow-md'>
   {
  lastDebts?   lastDebts.map((item)=>(
   <DebtItem debt={item} key={item.id}/>
  )):
 <View >

<Text className='text-neutral-400 text-center w-full font-kufi'>
  {language?.id==='en'?"No debts are found.":language?.id==='fr'?"Aucune crédits n'est trouvée.":"لم يتم العثور على ديون."}
</Text>

 </View>
   }
</View>
    </View>
  )
}

export default LastDebtsCard