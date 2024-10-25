import { View, Text } from 'react-native'
import React, { ReactNode, useEffect, useState,type PropsWithChildren  } from 'react'
import { getSession } from '@/libs/appwrite'
import { useSession } from '@/hooks/useSession'
import { Redirect, useRouter } from 'expo-router'
import Loader from '@/components/ui/Loader'
import useAccountStore from '@/stores/useAccountStore'

const SessionProvider = ({ children }:{children:ReactNode}) => {
    const {session,isLoading}=useSession();
    const {setAccount}=useAccountStore()
  useEffect(() => {
    if(session){
      
       setAccount({
        id:session.account.$id,
        name:session.account.name,
        username:session.account.username,
        email:session.account.email,
        type:session.account.type,
        avatar:session.account.avatar,
        phone:session.account.phone,
        verified:session.account.verified
       })

    }
  }, [session])
  
  if(isLoading) return <Loader/>
  if (!session) {
    return <Redirect href={"../auth/sign-in"} />;
  }else{
    if(!session.account.email){
      return <Redirect href={"../../auth/send-account-otp"} />;
    }else if(!session.account.verified) {
    
      return <Redirect href={"../../auth/verify-account"} />;
   }else if(session.account.type==='NONE') {
     return <Redirect href={"../../user-type"} />;
  }
 
  }
  return (
   <>
   {children}
   </>
  )
}

export default SessionProvider