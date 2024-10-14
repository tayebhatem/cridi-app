import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import PageHeader from '@/components/ui/PageHeader'
import PageLayout from '@/components/ui/PageLayout'
import Avatar from '@/components/ui/Avatar'
import useAccountStore from '@/stores/useAccountStore'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import QRCode from 'react-native-qrcode-svg';
import { useRouter } from 'expo-router'
import { updateAccount } from '@/libs/appwrite'
const AccountScreen = () => {
    const {account,setAccount}=useAccountStore();
    const router=useRouter()
     
  const [accountForm, setAccountForm] = useState({
    name: {
      value: '',
      error: '',
    },
    phone: {
      value: '',
      error: '',
    },
  });
  const validateForm = () => {
    let valid = true;

    if (accountForm.name.value.trim().length ===0) {
      setAccountForm((prevState) => ({
        ...prevState,
        name: {
          ...prevState.name,
          error: 'Name is required.',
        },
      }));
      valid = false;
    }

    return valid;
  };

  const handleNameChange = (value: string) => {
    setAccountForm((prevState) => ({
      ...prevState,
      name: {
        ...prevState.name,
        value,
        error: '', // Clear error on input change
      },
    }));
  };
  const handlePhoneChange = (value: string) => {
    setAccountForm((prevState) => ({
      ...prevState,
      phone: {
        ...prevState.phone,
        value,
        error: '', // Clear error on input change
      },
    }));
  };

   const saveChange=async()=>{
    const isValid = validateForm();
    if(isValid){
        try {
       
            if(account){
                const data=await updateAccount(account.id,accountForm.name.value,accountForm.phone.value)
              if(data) {
                 setAccount(data)
                 router.back()

              }
    
            }
        } catch (error) {
            console.log(error)
        }
    }
  
   }

   useEffect(() => {
  if(account){
    setAccountForm({
        name:{
            value:account?.name,
            error:''
        },
        phone:{
            value:account.phone,
            error:''
        }
     })
  }
   }, [account])
   
  return (
 <PageLayout>
     <PageHeader title='Account'/>
     
    <View className='bg-white shadow-primary-500 shadow-md rounded-md p-6 w-full  flex items-center space-y-4'>
   <View className='flex items-center'>
   <Avatar size='Large' url={account?.avatar}/> 
   <Text className='text-lg font-medium'>{account?.name}</Text>
   <Text className='text-neutral-400'>{account?.username}</Text>
   </View>
    <Input 
    title='Name'
    type='text'
    placeholder='Name'
    value={account?.name}
    onChange={handleNameChange}
    error={accountForm.name.error}
    />
    <Input 
    title='Phone'
    type='phone'
    placeholder='07889900077'
    value={account?.phone}
    onChange={handlePhoneChange}
    error=''
    />

    <Button onChange={saveChange} title='Save change'/>
    </View>
   
 </PageLayout>
  )
}

export default AccountScreen