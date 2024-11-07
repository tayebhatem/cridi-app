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
import Logo from '@/components/ui/Logo';
import ErrorMessage from '@/components/ui/ErrorMessage';
import { useToast } from 'react-native-toast-notifications';

const SendAccountOtpScreen = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  const { language } = useLanguageStore(); 
  const toast = useToast();
  const {account,setAccount}=useAccountStore()
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
       if(account){
      const data= await createEmail(account.id,emailForm.email.value)
      if(data){
       
        setAccount(data)
       const tokenData=await sendOtp(data.id,'account')
      if(tokenData) {
       
       await sendVerificationCode(tokenData.token,emailForm.email.value,'account')
         router.push('/auth/verify-account-otp')
        }; 
      }
       
       }
      } catch (error) {
        
        if (error instanceof Error) {
            
            if(error.message==='Document with the requested ID already exists. Try again with a different ID or use ID.unique() to generate a unique ID.'){
              const errorMessage = language?.id === 'en' 
              ? 'Email already exists' 
              : language?.id === 'fr' 
              ? "E-mail existe déjà." 
              : "البريد الإكتروني موجود.";
              setEmailForm((prevState) => ({
                ...prevState,
                email: {
                  ...prevState.email,
                  error:errorMessage,
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
              {language?.id === 'en' ? 'Verify account' : language?.id === 'fr' ? 'Vérifier le compte' : 'تحقق من الحساب'}
            </Text>
            <Text className="text-neutral-400 font-kufi leading-6">
              {language?.id === 'en' ? 'Please enter your email to receive an OTP.' : language?.id === 'fr' ? 'Veuillez entrer votre email pour recevoir un OTP.' : 'يرجى إدخال بريدك الإلكتروني لتلقي رمز التحقق.'}
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

export default SendAccountOtpScreen;
