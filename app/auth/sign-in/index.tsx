import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { Link, useRouter } from 'expo-router';
import { login } from '@/libs/appwrite';
import Alert from '@/components/ui/Alert';
import useLanguageStore from '@/stores/useLanguageStore';
import Logo from '@/components/ui/Logo';
import LanguageButton from '@/components/ui/LanguageButton';
import ErrorMessage from '@/components/ui/ErrorMessage';
import { states, supplierFields } from '@/constants/supplier';
import useAccountStore from '@/stores/useAccountStore';
import { useToast } from 'react-native-toast-notifications';

const SignInScreen = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  const { language } = useLanguageStore(); 
const {setAccount,setSupplier}=useAccountStore()
const toast = useToast();
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

  const resetForm=()=>{
    setLoginForm({
      username:{
        value:'',
        error:''
      },
      password:{
        value:'',
        error:''
      }
   
    })
  }
  const handleSubmit = async () => {
    const isValid = validateForm();

    if (isValid) {
      try {
        const session = await login(loginForm.username.value, loginForm.password.value);
        if (session) {
          setAccount({
            id:session.account.$id,
            name:session.account.name,
            username:session.account.username,
            email:session.account.email,
            type:session.account.type,
            avatar:session.account.avatar,
            phone:session.account.phone,
            verified:session.account.verified
           })
        if(session.account.supplier){
            setSupplier({
              id:session.account.supplier.$id,
              description:session.account.supplier.description,
              field:supplierFields.find(item=>item.id===session.account.supplier.field) || supplierFields[0],
              state:states.find(item=>item.id===session.account.supplier.state) || states[0]
            })
        
        }
          router.push('../../dashboard');
          resetForm()
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
          } else if(error.message==='Network request failed') {
           
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
  };

  return (
    <>
      <SafeAreaView className="bg-white p-6 h-full w-full flex space-y-3 ">
     <LanguageButton/>
     <View className='py-2'>
     <Logo/>
     </View>

          <View className=''>
            <Text className="text-2xl font-kufi-semi-bold">
              {language?.id === 'en' ? 'Login' : language?.id === 'fr' ? 'Connexion' : 'تسجيل الدخول'}
            </Text>
            <Text className="text-neutral-400 font-kufi leading-6">
              {language?.id === 'en' ? 'Please sign in to continue.' : language?.id === 'fr' ? 'Veuillez vous connecter pour continuer.' : 'يرجى تسجيل الدخول للمتابعة.'}
            </Text>
          </View>

      <View>
      <Input
            title={language?.id === 'en' ? 'Username' : language?.id === 'fr' ? 'Nom d\'utilisateur' : 'إسم المستخدم'}
            type="text"
            placeholder='johndoe'
            value={loginForm.username.value}
            error={loginForm.username.error}
            onChange={handleUsernameChange} 
          />
 <ErrorMessage error={loginForm.username.error}/>
        

          <Input
            title={language?.id === 'en' ? 'Password' : language?.id === 'fr' ? 'Mot de passe' : 'كلمة المرور'}
            type="password"
            placeholder={language?.id === 'en' ? '*********' : language?.id === 'fr' ? '*********' : '*********'}
            value={loginForm.password.value}
            error={loginForm.password.error}
            onChange={handlePasswordChange} 
          />
           <ErrorMessage error={loginForm.password.error}/>
        
  <Link href={'/auth/send-password-otp'} className='text-primary-500 py-1 underline font-kufi-medium leading-6 '>{
    language?.id==='en'?"Forget password ?":language?.id==='fr'?"Mot de passe oublié ?":"نسيت كلمة المرور؟"
  }</Link>
      </View>
       <View>
       <Button title={language?.id === 'en' ? 'Login' : language?.id === 'fr' ? 'Connexion' : 'تسجيل الدخول'} onChange={handleSubmit} />
       </View>
          <View className={`flex py-3 ${language?.id==='ar'?'flex-row-reverse':'flex-row'} items-center gap-x-2 justify-center `}>
  <Text className='font-kufi-medium text-center text-base'>
    {language?.id === 'en' ? "Don't have an account?" : language?.id === 'fr' ? "Vous n'avez pas de compte ?" : "ليس لديك حساب؟"}
  </Text>
  <Link href={'/auth/sign-up'} className='font-kufi-semi-bold text-primary-500 text-base'>
    {language?.id === 'en' ? 'Register' : language?.id === 'fr' ? "S'inscrire" : 'إنشاء حساب'}
  </Link>
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
