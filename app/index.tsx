import { View, Text ,Image} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Button from '@/components/ui/Button'
import { Redirect, useRouter } from 'expo-router'
import { useSession } from '@/hooks/useSession'
import Loader from '@/components/ui/Loader'
import useLanguageStore from '@/stores/useLanguageStore'

const OnboardingScreen = () => {
    const router=useRouter()
    const {session,isLoading}=useSession();
    const {language}=useLanguageStore()
 if(isLoading) return <Loader/>
 if (session) {
  return <Redirect href={"/dashboard"} />;
}

  return (
   <SafeAreaView className='p-4 flex justify-end items-center   bg-white h-full'>

     <Image source={require('../assets/images/onboarding.png')} resizeMode='cover'   className='w-64 h-64 my-4'/>
      <Text className='text-2xl font-kufi-semi-bold  w-full '>
        {
        language?.id==='en'?"Start Tracking and Payments your debts and payments":language?.id==='fr'?"Commencez à suivre et à payer vos dettes et paiements maintenant":"إبدأ بتتبع وسداد ديونك ومدفوعاتك الآن"
        }
        </Text>
    <Text className='text-neutral-400 font-kufi leading-6' >
    {
        language?.id==='en'?"You can log in to your account to easily track your debts and payments with stores. Keep all your transactions organized, manage balances effortlessly, and communicate directly with stores to ensure smooth and efficient business relationships."
        :language?.id==='fr'?"Vous pouvez vous connecter à votre compte pour suivre facilement vos dettes et paiements avec les magasins. Gardez toutes vos transactions organisées, gérez vos soldes sans effort et communiquez directement avec les magasins pour assurer des relations commerciales fluides et efficaces."
        :"يمكنك تسجيل الدخول إلى حسابك لتتبع ديونك ومدفوعاتك مع المتاجر بسهولة. احفظ جميع معاملاتك منظمة، وأدِر أرصدتك بكل سهولة، وتواصل مباشرة مع المتاجر لضمان علاقات تجارية سلسة وفعالة."
        }
    </Text>
    <Button onChange={async()=>router.push('./auth/sign-in')} title={language?.id==='en'?"Start Now":language?.id==='fr'?"Commence Maintenant":"إبدأ الآن"}/>
   </SafeAreaView>
  )
}

export default OnboardingScreen