
import React from 'react'
import { Redirect, Stack } from 'expo-router'

const AuthLayout = () => {
   
  return (
  <Stack>
    <Stack.Screen name="sign-in/index" options={{ headerShown: false }} />
    <Stack.Screen name="sign-up/index" options={{ headerShown: false }} />
  </Stack> 
  )
}

export default AuthLayout