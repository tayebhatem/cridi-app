import { View, Text, Image, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { Link, useRouter } from 'expo-router';
import { getAccountByEmail, sendOtp, sendVerificationCode } from '@/libs/appwrite'; // New function to send OTP to user's email
import Alert from '@/components/ui/Alert';
import useLanguageStore from '@/stores/useLanguageStore';
import useAccountStore from '@/stores/useAccountStore';
import Logo from '@/components/ui/Logo';
import ErrorMessage from '@/components/ui/ErrorMessage';
import { useToast } from 'react-native-toast-notifications';

const SendpasswordOtpScreen = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  const { language } = useLanguageStore(); 
  const toast = useToast();
  const {setAccount}=useAccountStore()
  const [emailForm, setEmailForm] = useState({
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
    if (!validateEmail(emailForm.email.value)) {
      setEmailForm((prevState) => ({
        ...prevState,
        email: {
          ...prevState.email,
          error: language?.id === 'en' ? 'Invalid email address.' : language?.id === 'fr' ? 'Adresse e-mail invalide.' : 'عنوان البريد الإلكتروني غير صالح.',
        },
      }));
      valid = false;
    }

    // Ensure email field isn't empty
    if (emailForm.email.value.trim().length === 0) {
        setEmailForm((prevState) => ({
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
        const account=await getAccountByEmail(emailForm.email.value)
       const tokenData=await sendOtp(account.id,'password')
        if(tokenData) {
          
          setAccount(account)   
         await sendVerificationCode(tokenData.token,tokenData.account.email,'password')
         router.push('/auth/verify-password-otp')
          }; 
        
      } catch (error) {
        if (error instanceof Error) {
         if(error.message==="Cannot read property '$id' of undefined"){
            setEmailForm((prevState) => ({
                ...prevState,
                email: {
                  ...prevState.email,
                  error: language?.id === 'en' ? "Email does not exist" : language?.id === 'fr' ?"Adresse e-mail n'existe pas" : "البريد الإلكتروني غير موجود",
                },
              }));
         }else{
          if(error.message==='Network request failed') {
           
            const errorMessage=language?.id === 'en' ? 'Network Error' : language?.id === 'fr' ?  'Erreur Réseau' : 'خطأ في الشبكة'
            toast.show(errorMessage,{
              type:"danger"
            });
        
          }else {
          
            const errorMessage=language?.id === 'en' ? error.message : language?.id === 'fr' ? 'Une erreur s\'est produite.' : 'حدث خطأ ما.'
            toast.show(errorMessage,{
              type:"danger"
            });
        
          }
          
         }
        }
      }
    }
  };

  return (
    <>
      <SafeAreaView className="bg-white p-4 h-full space-y-4 ">
        
     
       

      <View>
  <Text className="text-2xl font-kufi-semi-bold">
    {language?.id === 'en' ? 'Reset Password' : language?.id === 'fr' ? 'Réinitialiser le mot de passe' : 'إعادة تعيين كلمة المرور'}
  </Text>
  <Text className="text-neutral-400 font-kufi leading-6">
    {language?.id === 'en' 
      ? 'Please enter your email to receive a password reset code.' 
      : language?.id === 'fr' 
      ? 'Veuillez entrer votre email pour recevoir un code de réinitialisation du mot de passe.' 
      : 'يرجى إدخال بريدك الإلكتروني لتلقي رمز إعادة تعيين كلمة المرور.'}
  </Text>
</View>


        <View>
        <Input
            title={language?.id === 'en' ? 'Email' : language?.id === 'fr' ? 'E-mail' : 'البريد الإلكتروني'}
            type="email"
            placeholder='johndoe@example.com'
            value={emailForm.email.value}
            error={emailForm.email.error}
            onChange={(value) => setEmailForm((prev) => ({
              ...prev,
              email: { value, error: '' }
            }))}
          />
         <ErrorMessage error={emailForm.email.error }/>
        </View>
        
     <View>
     <Button title={language?.id === 'en' ? 'Send' : language?.id === 'fr' ? 'Envoyer' : 'إرسال'} onChange={handleSubmit} />

     </View>
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

export default SendpasswordOtpScreen;
