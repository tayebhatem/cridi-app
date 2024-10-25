
import React, { useEffect, useState } from 'react'
import {  useLocalSearchParams, useRouter } from 'expo-router'
import useAccountStore from '@/stores/useAccountStore';
import { AccountUserType } from '@/types';
import { getAccountStore, getAccountStores } from '@/actions/store';
import Loader from '@/components/ui/Loader';
import StoreDetails from '@/components/store/StoreDetails';
import StoreProfile from '@/components/store/StoreProfile';


const StoreScreen = () => {
  const {id}=useLocalSearchParams();
  const {account}=useAccountStore()
  const [accountStore, setaccountStore] = useState<AccountUserType | undefined>()
  const [isLoading, setIsLoading] = useState(true)
useEffect(() => {
  if(account && id){
    const fetchStoreAccount=async()=>{
      
      try {
        const data=await getAccountStore(account.id,id as string)
        setaccountStore(data)
      } catch (error) {
        console.log(error)
      }finally{
        setIsLoading(false)
      }
    
   
    }
    fetchStoreAccount()
  }
 
}, [])
if(isLoading){
  return <Loader/>
}else{
  if(accountStore && accountStore.accepted){
     return <StoreDetails id={accountStore.id}/>
  }else{
    return <StoreProfile id={id as string}/>
  }
}
  
}

export default StoreScreen