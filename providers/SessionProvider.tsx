
import React, { ReactNode  } from 'react'
import { useSession } from '@/hooks/useSession'
import { Redirect } from 'expo-router'
import Loader from '@/components/ui/Loader'


const SessionProvider = ({ children }:{children:ReactNode}) => {
    const {session,isLoading}=useSession();
    
  
  if(isLoading) return <Loader/>
  if (!session) {
    return <Redirect href={"/auth/sign-in"} />;
  }else{
    if(session.account.type==='SUPPLIER' && !session.account.supplier){
      return <Redirect href={"/supplier"} />;
    }
  }
  return (
   <>
   {children}
   </>
  )
}

export default SessionProvider