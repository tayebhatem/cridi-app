import { View, Text } from 'react-native'
import React from 'react'
import { Redirect, Stack } from 'expo-router'
import { useSession } from '@/hooks/useSession';
import Loader from '@/components/ui/Loader';

const AuthLayout = () => {
  const {session,isLoading}=useSession();
 
if(isLoading) return <Loader/>
if (session) {
return <Redirect href={"../dashboard"} />;
}
  return (
    <Stack>
        
        <Stack.Screen name='sign-in/index' options={{headerShown:false,animation:'slide_from_right'}}/>
        <Stack.Screen name='sign-up/index' options={{headerShown:false,animation:'slide_from_right'}}/>
    </Stack>
  )
}

export default AuthLayout