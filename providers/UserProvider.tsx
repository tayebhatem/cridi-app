import { View, Text } from 'react-native'
import React, { ReactNode } from 'react'
import useAccountStore from '@/stores/useAccountStore'
import { Redirect } from 'expo-router'

const UserProvider = ({children}:{children:ReactNode}) => {
    const {account}=useAccountStore()

  
  return (
    <>
    {children}
    </>
  )
}

export default UserProvider