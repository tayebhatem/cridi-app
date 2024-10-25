import { View, Text, Image, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { Link, useRouter } from 'expo-router';
import { createAccount, login } from '@/libs/appwrite';
import Alert from '@/components/ui/Alert';
import useLanguageStore from '@/stores/useLanguageStore';

const SignUpScreen = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  const { language } = useLanguageStore(); 
  
  const [registerForm, setRegisterForm] = useState({
    name: {
      value: '',
      error: '',
    },
    username: {
      value: '',
      error: '',
    },
    password: {
      value: '',
      error: '',
    },
    confirmPassword: {
      value: '',
      error: '',
    },
  });

 

  const validateForm = () => {
    let valid = true;
// Validate username
if (registerForm.name.value.trim().length < 6) {
  setRegisterForm((prevState) => ({
    ...prevState,
    name: {
      ...prevState.name,
      error: language?.id === 'en' ? 'Name must be at least 6 characters long' : language?.id === 'fr' ? 'Le nom  doit comporter au moins 6 caractères' : 'يجب أن يتكون الإسم من 6 أحرف على الأقل',
    },
  }));
  valid = false;
}
   

    // Validate username
    if (registerForm.username.value.trim().length < 6) {
      setRegisterForm((prevState) => ({
        ...prevState,
        username: {
          ...prevState.username,
          error: language?.id === 'en' ? 'Username must be at least 6 characters long' : language?.id === 'fr' ? 'Le nom d\'utilisateur doit comporter au moins 6 caractères' : 'يجب أن يتكون إسم المستخدم من 6 أحرف على الأقل',
        },
      }));
      valid = false;
    }

    // Validate password
    if (registerForm.password.value.trim().length < 6) {
      setRegisterForm((prevState) => ({
        ...prevState,
        password: {
          ...prevState.password,
          error: language?.id === 'en' ? 'Password must be at least 6 characters long' : language?.id === 'fr' ? 'Le mot de passe doit comporter au moins 6 caractères' : 'يجب أن تتكون كلمة المرور من 6 أحرف على الأقل',
        },
      }));
      valid = false;
    }
    if (registerForm.confirmPassword.value.trim().length < 6) {
      setRegisterForm((prevState) => ({
        ...prevState,
        confirmPassword: {
          ...prevState.confirmPassword,
          error: language?.id === 'en' ? 'Password must be at least 6 characters long' : language?.id === 'fr' ? 'Le mot de passe doit comporter au moins 6 caractères' : 'يجب أن تتكون كلمة المرور من 6 أحرف على الأقل',
        },
      }));
      valid = false;
    }
    // Validate password confirmation
    if (registerForm.confirmPassword.value !== registerForm.password.value) {
      setRegisterForm((prevState) => ({
        ...prevState,
        confirmPassword: {
          ...prevState.confirmPassword,
          error: language?.id === 'en' ? 'Passwords do not match.' : language?.id === 'fr' ? 'Les mots de passe ne correspondent pas.' : 'كلمات المرور غير متطابقة.',
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
        const {username,password,name}=registerForm
       const session = await createAccount(username.value,name.value,password.value);
        if (session) {
          router.push('../../dashboard');
        }
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message)
          if(error.message==="Document with the requested ID already exists. Try again with a different ID or use ID.unique() to generate a unique ID."){
            const errorMessage = language?.id === 'en' 
  ? 'Username already exists' 
  : language?.id === 'fr' 
  ? "Le nom d'utilisateur existe déjà." 
  : "اسم المستخدم موجود بالفعل.";
  setRegisterForm((prevState) => ({
    ...prevState,
    username: {
      ...prevState.username,
      error:errorMessage,
    },
  }));
          }else{
 setError(language?.id === 'en' ? error.message : language?.id === 'fr' ? 'Une erreur s\'est produite.' : 'حدث خطأ ما.');
         setOpen(true);
          }
       
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

          <View className=''>
            <Text className="text-2xl font-kufi-semi-bold">
              {language?.id === 'en' ? 'Sign Up' : language?.id === 'fr' ? 'Inscription' : 'إنشاء حساب'}
            </Text>
            <Text className="text-neutral-400 font-kufi leading-6">
              {language?.id === 'en' ? 'Please fill the form to create an account.' : language?.id === 'fr' ? 'Veuillez remplir le formulaire pour créer un compte.' : 'يرجى ملء النموذج لإنشاء حساب.'}
            </Text>
          </View>
          
          <Input
            title={language?.id === 'en' ? 'Name' : language?.id === 'fr' ? 'Nom' : 'الإسم'}
            type="text"
            placeholder='John Doe'
            value={registerForm.name.value}
            error={registerForm.name.error}
            onChange={(value) => setRegisterForm((prev) => ({
              ...prev,
              name: { value, error: '' }
            }))}
          />
   {registerForm.name.error && (
            <Text className='text-red-500 font-kufi leading-5'>{registerForm.name.error}</Text>
          ) }
          <Input
            title={language?.id === 'en' ? 'Username' : language?.id === 'fr' ? 'Nom d\'utilisateur' : 'إسم المستخدم'}
            type="text"
            placeholder='johndoe'
            value={registerForm.username.value}
            error={registerForm.username.error}
            onChange={(value) => setRegisterForm((prev) => ({
              ...prev,
              username: { value, error: '' }
            }))}
          />
 {registerForm.username.error && (
            <Text className='text-red-500 font-kufi leading-5'>{registerForm.username.error}</Text>
          ) }
          <Input
            title={language?.id === 'en' ? 'Password' : language?.id === 'fr' ? 'Mot de passe' : 'كلمة المرور'}
            type="password"
            placeholder='*********'
            value={registerForm.password.value}
            error={registerForm.password.error}
            onChange={(value) => setRegisterForm((prev) => ({
              ...prev,
              password: { value, error: '' }
            }))}
          />
 {registerForm.password.error && (
            <Text className='text-red-500 font-kufi leading-5'>{registerForm.password.error}</Text>
          ) }
          <Input
            title={language?.id === 'en' ? 'Confirm Password' : language?.id === 'fr' ? 'Confirmer le mot de passe' : 'تأكيد كلمة المرور'}
            type="password"
            placeholder='*********'
            value={registerForm.confirmPassword.value}
            error={registerForm.confirmPassword.error}
            onChange={(value) => setRegisterForm((prev) => ({
              ...prev,
              confirmPassword: { value, error: '' }
            }))}
          />
 {registerForm.confirmPassword.error && (
            <Text className='text-red-500 font-kufi leading-5'>{registerForm.confirmPassword.error}</Text>
          ) }
          <Button title={language?.id === 'en' ? 'Sign Up' : language?.id === 'fr' ? 'Inscription' : 'إنشاء حساب'}  onChange={handleSubmit} />

          <View className='flex flex-row items-center space-x-2 justify-center'>
            <Text className='font-kufi-medium text-center text-base'>
              {language?.id === 'en' ? 'Already have an account?' : language?.id === 'fr' ? 'Vous avez déjà un compte ?' : 'لديك حساب بالفعل؟'}
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

export default SignUpScreen;
