import React from 'react'
import { Redirect, Stack } from 'expo-router'
import { useSession } from '@/hooks/useSession';
import Loader from '@/components/ui/Loader';

const AuthLayout = () => {
  const {session,isLoading}=useSession();
 

  return (
    <Stack>
        
        <Stack.Screen name='sign-in/index' options={{headerShown:false,animation:'slide_from_right'}}/>
        <Stack.Screen name='sign-up/index' options={{headerShown:false,animation:'slide_from_right'}}/>
        <Stack.Screen name='send-account-otp/index' options={{headerShown:false,animation:'slide_from_right'}}/>
        <Stack.Screen name='send-password-otp/index' options={{headerShown:false,animation:'slide_from_right'}}/>
        <Stack.Screen name='verify-account/index' options={{headerShown:false,animation:'slide_from_right'}}/>
    </Stack>
  )
}

export default AuthLayout