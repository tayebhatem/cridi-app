import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons'
import { getStore } from '@/actions/store'
import { useRouter } from 'expo-router'
import { StoreType } from '@/types'
import Avatar from '../ui/Avatar'

const StoreHeader = ({id}:{id:string}) => {
    const router=useRouter()
  const [store, setStore] = useState<StoreType | undefined>() 

  useEffect(() => {
  
    const fetchStore=async()=>{
      if(id){
       try {
         const data=await getStore(id as string)
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
  <Avatar size='Small' url={store?.avatar}/>
    <View>
      <Text className='text-lg font-medium'>{store?.name}</Text>
      <Text className='text-neutral-500'>{store?.adress}</Text>  
    </View>
 
  </View>
  <TouchableOpacity activeOpacity={0.8} onPress={()=>router.back()}>
    <AntDesign name='arrowleft' size={28} />
    </TouchableOpacity>
  </View>
  )
}

export default StoreHeader