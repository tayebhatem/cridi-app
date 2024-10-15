import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AccountUserType } from '@/types'
import { getAccountStores } from '@/actions/store'
import useAccountStore from '@/stores/useAccountStore'
import StoreItem from '../store/StoreItem'


const StorsCard = () => {
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
    <View className='my-4'>
     {
    stors?.map((store)=>(
      <StoreItem store={store} key={store.id}/>
    ))
     }
    </View>
  )
}

export default StorsCard