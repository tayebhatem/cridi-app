import { View, Text, Alert, Image } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { useRouter } from 'expo-router';

import { login } from '@/libs/appwrite';
import useAccountStore from '@/stores/useAccountStore';


const SignInScreen = () => {
    const router=useRouter();
   
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
    if (loginForm.username.value.trim().length < 3) {
      setLoginForm((prevState) => ({
        ...prevState,
        username: {
          ...prevState.username,
          error: 'Username must be at least 3 characters long',
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
          error: 'Password must be at least 6 characters long',
        },
      }));
      valid = false;
    }

    return valid;
  };

  // Handle form submission
  const handleSubmit = async() => {
    const isValid = validateForm();

    if (isValid) {
     const session =await login(loginForm.username.value,loginForm.password.value)
     if(session){
    
        router.push('../../dashboard')
     }
  
    }
  };

  return (
    <SafeAreaView className="bg-white p-4 h-full ">
      <View className='w-full flex  my-4 space-y-4'>

       <View className='w-full items-center'> 
       <Image source={require('../../../assets/images/logo.png')} resizeMode='contain' className='w-24 h-24 '/>
       </View>

      <View className=''>
      <Text className="text-2xl font-semibold">Login</Text>
        <Text className="text-[#aaa]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </Text>
      </View>

        <Input
          title="Username"
          type="text"
          placeholder='jhondoa'
          value={loginForm.username.value}
          error={loginForm.username.error}
          onChange={handleUsernameChange} // Handle change
        />
       
        {loginForm.username.error ? (
          <Text style={{ color: 'red' }}>{loginForm.username.error}</Text>
        ) : null}


        <Input
          title="Password"
          type="password"
          placeholder='*********'
          value={loginForm.password.value}
          error={loginForm.password.error}
          onChange={handlePasswordChange} // Handle change
        />
        {/* Show password error */}
        {loginForm.password.error ? (
          <Text style={{ color: 'red' }}>{loginForm.password.error}</Text>
        ) : null}

      <Button title='Login' onChange={handleSubmit}/>
      </View>
    </SafeAreaView>
  );
};

export default SignInScreen;
