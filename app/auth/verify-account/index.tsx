import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import OtpInput from '@/components/ui/OtpInput';
import Logo from '@/components/ui/Logo';
import { verify } from '@/libs/appwrite';
import useAccountStore from '@/stores/useAccountStore';
import { router } from 'expo-router';

const VerifyAccount = () => {
    const [otp, setOtp] = React.useState('');
    const [error, setError] = useState('')
    const {account}=useAccountStore()
    const handlChange=(text:string)=>{
            setOtp(text)
    } 
 const verifOtp=async()=>{
  if(account){
    try {
       const verfied= await verify(otp,account.id)
       if(verfied){
        router.push('/dashboard')
       }
    } catch (error) {
        if(error instanceof Error){
            setError(error.message)
        }
    }
  }
 }
 useEffect(() => {
       if(otp.length===4){
        verifOtp()
       }
 }, [otp])
 
  return (
   <SafeAreaView className='bg-white dark:bg-dark-500 p-6 h-full'>
    <Logo/>
 <View className='space-y-2'>
 <OtpInput onChange={handlChange}error={error}/>
 <Text className='text-red-500 text-center'>{error}</Text>
 </View>
   </SafeAreaView>
  )
}

export default VerifyAccount