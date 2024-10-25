import { View, Text, Image, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { Link, useRouter } from 'expo-router';
import { createEmail, sendOtp, sendVerificationCode } from '@/libs/appwrite'; // New function to send OTP to user's email
import Alert from '@/components/ui/Alert';
import useLanguageStore from '@/stores/useLanguageStore';
import useAccountStore from '@/stores/useAccountStore';

const SendAccountOtpScreen = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  const { language } = useLanguageStore(); 
  const {account}=useAccountStore()
  const [registerForm, setRegisterForm] = useState({
    email: {
      value: '',
      error: '',
    },
  });

  // Validation functions
  const validateEmail = (email:string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    let valid = true;

    // Validate email
    if (!validateEmail(registerForm.email.value)) {
      setRegisterForm((prevState) => ({
        ...prevState,
        email: {
          ...prevState.email,
          error: language?.id === 'en' ? 'Invalid email address.' : language?.id === 'fr' ? 'Adresse e-mail invalide.' : 'عنوان البريد الإلكتروني غير صالح.',
        },
      }));
      valid = false;
    }

    // Ensure email field isn't empty
    if (registerForm.email.value.trim().length === 0) {
      setRegisterForm((prevState) => ({
        ...prevState,
        email: {
          ...prevState.email,
          error: language?.id === 'en' ? 'Email is required' : language?.id === 'fr' ? 'Adresse e-mail requise' : 'البريد الإلكتروني مطلوب',
        },
      }));
      valid = false;
    }

    return valid;
  };

  // Handle form submission
  const handleSubmit = async () => {
    const isValid = validateForm();

    if (isValid) {
      try {
       if(account){
      const data= await createEmail(account.id,registerForm.email.value)
      if(data){
       const tokenData=await sendOtp(data.$id,'account')
      if(tokenData) {
       await sendVerificationCode(tokenData.token,data.email)
         router.push('../auth/verify-account')
        }; 
      }
       
       }
      } catch (error) {
        
        if (error instanceof Error) {
            console.log(error.message)
          //setError(language?.id === 'en' ? error.message : language?.id === 'fr' ? 'Une erreur s\'est produite.' : 'حدث خطأ ما.');
          //setOpen(true);
        }
      }
    }
  };

  return (
    <>
      <SafeAreaView className="bg-white p-4 h-full ">
        <ScrollView className='h-full space-y-2' showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
          <View className='w-full items-center'>
            <Image source={require('../../../assets/images/logo.png')} resizeMode='contain' className='w-24 h-24 ' />
          </View>

          <View>
            <Text className="text-2xl font-kufi-semi-bold">
              {language?.id === 'en' ? 'Verify Account' : language?.id === 'fr' ? 'Vérifier le compte' : 'تحقق من الحساب'}
            </Text>
            <Text className="text-neutral-400 font-kufi leading-6">
              {language?.id === 'en' ? 'Please enter your email to receive an OTP.' : language?.id === 'fr' ? 'Veuillez entrer votre email pour recevoir un OTP.' : 'يرجى إدخال بريدك الإلكتروني لتلقي رمز التحقق.'}
            </Text>
          </View>
          
          <Input
            title={language?.id === 'en' ? 'Email' : language?.id === 'fr' ? 'E-mail' : 'البريد الإلكتروني'}
            type="email"
            placeholder='johndoe@example.com'
            value={registerForm.email.value}
            error={registerForm.email.error}
            onChange={(value) => setRegisterForm((prev) => ({
              ...prev,
              email: { value, error: '' }
            }))}
          />
          {registerForm.email.error && (
            <Text className='text-red-500 font-kufi leading-5'>{registerForm.email.error}</Text>
          )}
        
          <Button title={language?.id === 'en' ? 'Send OTP' : language?.id === 'fr' ? 'Envoyer OTP' : 'إرسال رمز التحقق'} onChange={handleSubmit} />

          <View className={`flex ${language?.id==='ar'?'flex-row-reverse':'flex-row'} items-center space-x-2 justify-center `}>
            <Text className='font-kufi-medium text-center text-base'>
              {language?.id === 'en' ? 'Already verified?' : language?.id === 'fr' ? 'Déjà vérifié?' : 'هل تم التحقق بالفعل؟'}
            </Text>
            <Link href={'../sign-in'} className='font-kufi-semi-bold text-primary-500 text-base'>
              {language?.id === 'en' ? 'Login' : language?.id === 'fr' ? 'Connexion' : 'تسجيل الدخول'}
            </Link>
          </View>
        </ScrollView>
      </SafeAreaView>

      <Alert
        title={language?.id === 'en' ? 'Error' : language?.id === 'fr' ? 'Erreur' : 'خطأ'}
        type='WARNING'
        description={error}
        onSave={() => setOpen(false)}
        open={open}
      />
    </>
  );
};

export default SendAccountOtpScreen;
