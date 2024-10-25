import { View, Text, Image, TouchableOpacity, useColorScheme } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons'
import {  getStoreByAccount } from '@/actions/store'
import { useRouter } from 'expo-router'
import { StoreType } from '@/types'
import Avatar from '../ui/Avatar'
import useStore from '@/stores/useStore'



const StoreHeader = ({id}:{id:string}) => {
    const router=useRouter()
  const{setStore,store}=useStore()
const theme=useColorScheme()
  useEffect(() => {
  
    const fetchStore=async()=>{
      if(id){
       try {
         const data=await getStoreByAccount(id as string)
         if(!data) return
         setStore(data)
       } catch (error) {
         console.log(error)
       }
      }
}
fetchStore()

  }, [id])
  return (
    <View className='flex flex-row items-center justify-between'>
   
  <View className='flex flex-row items-center gap-x-2 '>
  <Avatar size='Small' url={store?.avatar} uplaod/>
    <View>
      <Text className='text-lg font-medium text-black dark:text-white'>{store?.name}</Text>
      <Text className='text-neutral-500'>{store?.adress}</Text>  
    </View>
 
  </View>
  <TouchableOpacity activeOpacity={0.8} onPress={()=>router.back()}>
    <AntDesign name='arrowleft' size={28} color={theme==='dark'?"#FFF":"#000"} />
    </TouchableOpacity>
  </View>
  )
}

export default StoreHeader