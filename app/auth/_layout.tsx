import React from 'react'
import { Redirect, Stack } from 'expo-router'


const AuthLayout = () => {
 

  return (
    <Stack>
        
        <Stack.Screen name='sign-in/index' options={{headerShown:false,animation:'slide_from_right'}}/>
        <Stack.Screen name='sign-up/index' options={{headerShown:false,animation:'slide_from_right'}}/>
        <Stack.Screen name='send-account-otp/index' options={{animation:'slide_from_right',headerTitle:'',headerShadowVisible:false}}/>
        <Stack.Screen name='send-password-otp/index' options={{animation:'slide_from_right',headerTitle:'',headerShadowVisible:false}}/>
        <Stack.Screen name='verify-account-otp/index' options={{animation:'slide_from_right',headerTitle:'',headerShadowVisible:false}}/>
        <Stack.Screen name='verify-password-otp/index' options={{animation:'slide_from_right',headerTitle:'',headerShadowVisible:false}}/>
        <Stack.Screen name='reset-password/index' options={{animation:'slide_from_right',headerTitle:'',headerShadowVisible:false}}/>
    </Stack>
  )
}

export default AuthLayout