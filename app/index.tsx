import { View, Text ,Image} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Button from '@/components/ui/Button'
import { Redirect, useRouter } from 'expo-router'
import { useSession } from '@/hooks/useSession'
import Loader from '@/components/ui/Loader'

const OnboardingScreen = () => {
    const router=useRouter()
    const {session,isLoading}=useSession();
  
 if(isLoading) return <Loader/>
 if (session) {
  return <Redirect href={"/dashboard"} />;
}

  return (
   <SafeAreaView className='p-4 flex justify-end items-center   bg-white h-full'>

     <Image source={require('../assets/images/onboarding.png')} resizeMode='cover'   className='w-64 h-64 my-4'/>
      <Text className='text-2xl font-semibold  w-full '>Strat Tracking&Payments your debts and payments now</Text>
    <Text className='text-[#ccc]' >
Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi cum magni nesciunt reprehenderit voluptas amet quidem corrupti aperiam, reiciendis quia animi, facilis quis. Iste fugit, at repellendus porro veritatis consequuntur.
    </Text>
    <Button onChange={async()=>router.push('./auth/sign-in')} title='Login'/>
   </SafeAreaView>
  )
}

export default OnboardingScreen