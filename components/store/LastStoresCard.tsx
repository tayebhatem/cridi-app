import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link } from 'expo-router'
import StorsCard from '../dashboard/StorsCard'
import useAccountStore from '@/stores/useAccountStore'
import { AccountUserType } from '@/types'
import { getAccountStores } from '@/actions/store'
import StoreItem from './StoreItem'
import useLanguageStore from '@/stores/useLanguageStore'

const LastStoresCard = () => {
    const{language}=useLanguageStore()
    const [stors, setStors] = useState<AccountUserType[] | undefined>([])
    const {account}=useAccountStore()
    useEffect(() => {
     const fetchStors=async()=>{
         if(account){
            try {
                const data=await getAccountStores(account.id,3)
                setStors(data)
             } catch (error) {
                
             }
         }
     }

     fetchStors()
    }, [account])
  return (
    <View>
    <View className='flex flex-row items-center justify-between '>
      <Text className='text-lg text-black dark:text-white font-medium font-kufi-medium'>{language?.id==='en'?"Stors":language?.id==='fr'?"Magasins":"محلات"}</Text>
      <Link 
      href='../../stores' 
      className='text-primary-500 font-medium  font-kufi-medium leading-6'
      >
      {language?.id==='en'?"Read more":language?.id==='fr'?"En savoir plus":"إقرأ المزيد"}
      </Link>
    </View>
    
    <View className='my-4'>
   <FlatList
   showsHorizontalScrollIndicator={false}
   showsVerticalScrollIndicator={false}
    contentContainerStyle={{gap:10}}
   horizontal
   data={stors}
   keyExtractor={item=>item.id}
   renderItem={(item)=><StoreItem store={item.item}/>}
   />
    </View>
  
  </View>
  )
}

export default LastStoresCard