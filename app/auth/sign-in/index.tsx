import { View, Text, Image } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { Link, useRouter } from 'expo-router';
import { login } from '@/libs/appwrite';
import Alert from '@/components/ui/Alert';
import useLanguageStore from '@/stores/useLanguageStore';

const SignInScreen = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  const { language } = useLanguageStore(); 
  
  const [loginForm, setLoginForm] = useState({
    username: {
      value: '',
      error: '',
    },
    password: {
      value: '',
      error: '',
    },
  });

  // Handle username change
  const handleUsernameChange = (value: string) => {
    setLoginForm((prevState) => ({
      ...prevState,
      username: {
        ...prevState.username,
        value,
        error: '', // Clear error on input change
      },
    }));
  };

  // Handle password change
  const handlePasswordChange = (value: string) => {
    setLoginForm((prevState) => ({
      ...prevState,
      password: {
        ...prevState.password,
        value,
        error: '', // Clear error on input change
      },
    }));
  };

  // Validation function
  const validateForm = () => {
    let valid = true;

    // Validate username
    if (loginForm.username.value.trim().length < 6) {
      setLoginForm((prevState) => ({
        ...prevState,
        username: {
          ...prevState.username,
          error: language?.id === 'en' ? 'Username must be at least 6 characters long' : language?.id === 'fr' ? 'Le nom d\'utilisateur doit comporter au moins 6 caractères' : 'يجب أن يتكون إسم المستخدم من 6 أحرف على الأقل',
        },
      }));
      valid = false;
    }

    // Validate password
    if (loginForm.password.value.trim().length < 6) {
      setLoginForm((prevState) => ({
        ...prevState,
        password: {
          ...prevState.password,
          error: language?.id === 'en' ? 'Password must be at least 6 characters long' : language?.id === 'fr' ? 'Le mot de passe doit comporter au moins 6 caractères' : 'يجب أن تتكون كلمة المرور من 6 أحرف على الأقل',
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
        const session = await login(loginForm.username.value, loginForm.password.value);
        if (session) {
          router.push('../../dashboard');
        }
      } catch (error) {
        if (error instanceof Error) {
          if (error.message === 'Wrong username.') {
            setLoginForm((prevState) => ({
              ...prevState,
              username: {
                ...prevState.username,
                error: language?.id === 'en' ? 'Wrong username.' : language?.id === 'fr' ? 'Nom d\'utilisateur incorrect.' : 'اسم المستخدم غير صحيح.',
              },
            }));
          } else if (error.message === 'Wrong password.') {
            setLoginForm((prevState) => ({
              ...prevState,
              password: {
                ...prevState.password,
                error: language?.id === 'en' ? 'Wrong password.' : language?.id === 'fr' ? 'Mot de passe incorrect.' : 'كلمة المرور غير صحيحة.',
              },
            }));
          } else {
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
        <View className='w-full flex  my-4 space-y-4'>
          <View className='w-full items-center'>
            <Image source={require('../../../assets/images/logo.png')} resizeMode='contain' className='w-24 h-24 ' />
          </View>

          <View className=''>
            <Text className="text-2xl font-kufi-semi-bold">
              {language?.id === 'en' ? 'Login' : language?.id === 'fr' ? 'Connexion' : 'تسجيل الدخول'}
            </Text>
            <Text className="text-neutral-400 font-kufi leading-6">
              {language?.id === 'en' ? 'Please sign in to continue.' : language?.id === 'fr' ? 'Veuillez vous connecter pour continuer.' : 'يرجى تسجيل الدخول للمتابعة.'}
            </Text>
          </View>

          <Input
            title={language?.id === 'en' ? 'Username' : language?.id === 'fr' ? 'Nom d\'utilisateur' : 'إسم المستخدم'}
            type="text"
            placeholder='johndoe'
            value={loginForm.username.value}
            error={loginForm.username.error}
            onChange={handleUsernameChange} 
          />

          {loginForm.username.error ? (
            <Text className='text-red-500 font-kufi leading-5'>{loginForm.username.error}</Text>
          ) : null}

          <Input
            title={language?.id === 'en' ? 'Password' : language?.id === 'fr' ? 'Mot de passe' : 'كلمة المرور'}
            type="password"
            placeholder={language?.id === 'en' ? '*********' : language?.id === 'fr' ? '*********' : '*********'}
            value={loginForm.password.value}
            error={loginForm.password.error}
            onChange={handlePasswordChange} 
          />

          {loginForm.password.error ? (
            <Text className='text-red-500 font-kufi leading-5'>{loginForm.password.error}</Text>
          ) : null}

          <Button title={language?.id === 'en' ? 'Login' : language?.id === 'fr' ? 'Connexion' : 'تسجيل الدخول'} onChange={handleSubmit} />
          <View className='flex flex-row items-center space-x-2 justify-center'>
  <Text className='font-kufi-medium text-center text-base'>
    {language?.id === 'en' ? "Don't have an account?" : language?.id === 'fr' ? "Vous n'avez pas de compte ?" : "ليس لديك حساب؟"}
  </Text>
  <Link href={'../sign-up'} className='font-kufi-semi-bold text-primary-500 text-base'>
    {language?.id === 'en' ? 'Register' : language?.id === 'fr' ? "S'inscrire" : 'إنشاء حساب'}
  </Link>
</View>

        </View>
      </SafeAreaView>

      <Alert
        title={language?.id === 'en' ? 'Back' : language?.id === 'fr' ? 'Retour' : 'رجوع'}
        type='WARNING'
        description={error}
        onSave={() => setOpen(false)}
        open={open}
      />
    </>
  );
};

export default SignInScreen;
