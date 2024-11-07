import { View, Text, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import OtpInput from '@/components/ui/OtpInput';
import Logo from '@/components/ui/Logo';
import { sendOtp, sendVerificationCode, verifyPasswordOtp } from '@/libs/appwrite';
import useAccountStore from '@/stores/useAccountStore';
import { router } from 'expo-router';
import useLanguageStore from '@/stores/useLanguageStore';
import ErrorMessage from '@/components/ui/ErrorMessage';

const VerifyAccount = () => {
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const [countdown, setCountdown] = useState(30);
    const { account } = useAccountStore();
  

    const { language } = useLanguageStore();

    const handleChange = (text:string) => {
        setOtp(text);
    };

    const verifOtp = async () => {
        if (account) {
            try {
                const response = await verifyPasswordOtp(otp, account.id);

                if (response) {
                    setOtp('')
                    router.push('../reset-password');
                   
                }
            } catch (error) {
                if (error instanceof Error) {
                    if(error.message==='token does not exist'){
                        const error= language?.id === 'en'
                        ? 'The verification code is invalid.'
                        : language?.id === 'fr'
                        ? 'Le code de vérification est invalide.'
                        : 'رمز التحقق غير صالح.';
                        setError(error);
                    }else if(error.message==='token expired'){
                        const error= language?.id === 'en'
                        ? 'The verification code has expired.'
                        : language?.id === 'fr'
                        ? 'Le code de vérification a expiré.'
                        : 'رمز التحقق منتهي الصلاحية.';
                        setError(error);
                    }
                 
                }
            }
        }
    };

    useEffect(() => {
        if (otp.length === 4) {
            verifOtp();
        }
        if(otp.length<4){
            setError('')
        }
    }, [otp]);

    useEffect(() => {
        if (countdown > 0) {
            const timer = setInterval(() => setCountdown(prev => prev - 1), 1000);
            return () => clearInterval(timer);
        }
    }, [countdown]);

    const resendOtp = async() => {
       if(account){
        const tokenData=await sendOtp(account.id,'password')
      if(tokenData) {
        setCountdown(30);
        await sendVerificationCode(tokenData.token,tokenData.account.email,'password')
      
     }
       }
    };

    return (
        <SafeAreaView className='bg-white dark:bg-dark-500 p-6 h-full space-y-4'>
         
         <View>
  <Text className="text-2xl font-kufi-semi-bold">
    {language?.id === 'en' ? 'Reset Password' : language?.id === 'fr' ? 'Réinitialiser le mot de passe' : 'إعادة تعيين كلمة المرور'}
  </Text>
  <Text className="text-neutral-400 font-kufi leading-6">
    {language?.id === 'en' 
      ? `Please enter the OTP sent to your email ${account?.email} to reset your password.` 
      : language?.id === 'fr' 
      ? `Veuillez entrer le code de vérification envoyé à votre email ${account?.email} pour réinitialiser votre mot de passe.` 
      : `يرجى إدخال رمز التحقق المرسل إلى بريدك الإلكتروني ${account?.email} لإعادة تعيين كلمة المرور.`}
  </Text>
</View>


            <View className='space-y-2'>
                <OtpInput onChange={handleChange} error={error} />
                <ErrorMessage error={error }/>

                <View className={`flex py-3 ${language?.id === 'ar' ? 'flex-row-reverse' : 'flex-row'} items-center gap-x-2 justify-center`}>
                    <Text className='font-kufi-medium text-base'>
                        {language?.id === 'en' ? "Didn't receive the code?" : language?.id === 'fr' ? 'Pas reçu le code?' : 'لم تستلم الرمز؟'}
                    </Text>
                    <TouchableOpacity onPress={resendOtp} activeOpacity={0.8} disabled={countdown > 0}>
                        <Text className={`font-kufi-semi-bold text-base px-2 ${countdown > 0 ? 'text-gray-400' : 'text-primary-500'}`}>
                            {countdown > 0 ? `${countdown}s` : language?.id === 'en' ? 'Resend' : language?.id === 'fr' ? 'Renvoyer' : 'إعادة الإرسال'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default VerifyAccount;
