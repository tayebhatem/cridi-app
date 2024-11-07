
import React, { useEffect, useState } from 'react'
import {  useLocalSearchParams, useRouter } from 'expo-router'
import useAccountStore from '@/stores/useAccountStore';
import { AccountUserType, SubscriptionType } from '@/types';
import { getAccountStore, getAccountStores } from '@/actions/store';
import Loader from '@/components/ui/Loader';
import StoreDetails from '@/components/store/StoreDetails';
import StoreProfile from '@/components/store/StoreProfile';
import { getSubscription } from '@/libs/appwrite';
import { View } from 'react-native-reanimated/lib/typescript/Animated';
import StoreLocked from '@/components/store/StoreLocked';
import { format } from 'date-fns';


const StoreScreen = () => {
  const {id}=useLocalSearchParams();
  const {account}=useAccountStore()
  const currentDate=format(new Date(), 'yyyy-MM-dd')
  const [accountStore, setaccountStore] = useState<AccountUserType | undefined>()
  const [subscription, setSubscription] = useState<SubscriptionType | undefined>()
  const [isLoading, setIsLoading] = useState(true)
useEffect(() => {
  const fetchSubscription=async()=>{
    try {
      const data=await getSubscription(id as string)
   
     setSubscription(data)
    } catch (error) {
     
    }
  
 
  }
  if(account && id){

    const fetchStoreAccount=async()=>{
      try {
        const data=await getAccountStore(account.id,id as string)
        setaccountStore(data)
        fetchSubscription()
      } catch (error) {
        console.log(error)
      }finally{
        setIsLoading(false)
      }
    
   
    }
    

   
    fetchStoreAccount()
  }
 
}, [id,account])

if(isLoading){
  return <Loader/>
}else{

if((subscription?.type==='FREE' || subscription?.type==='STANDRAD') || (subscription?.type==='PRO' && subscription.expire<currentDate)){
     return <StoreLocked/>
}else{
  if(accountStore && accountStore.accepted){
    return <StoreDetails id={accountStore.id}/>
 }else{
   return <StoreProfile id={id as string}/>
 }
}
}
  
}

export default StoreScreen