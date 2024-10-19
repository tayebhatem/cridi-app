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
        type:session.account.type,
        avatar:session.account.avatar,
        phone:session.account.phone
       })

    }
  }, [session])
  
  if(isLoading) return <Loader/>
  if (!session) {
    return <Redirect href={"../auth/sign-in"} />;
  }
  return (
   <>
   {children}
   </>
  )
}

export default SessionProvider