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
import Alert from '@/components/ui/Alert'
import useLanguageStore from '@/stores/useLanguageStore'
import { accountTranslation } from '@/constants/translation'
const AccountScreen = () => {
    const {account,setAccount}=useAccountStore();
    const router=useRouter()
     const [openSave, setopenSave] = useState(false)
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

  const { language } = useLanguageStore();
  const accountTranslations=accountTranslation(language)
  const validateForm = () => {
    let valid = true;

    if (accountForm.name.value.trim().length ===0) {
      setAccountForm((prevState) => ({
        ...prevState,
        name: {
          ...prevState.name,
          error: accountTranslations.nameRequired,
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
                 setopenSave(true)

              }
    
            }
        } catch (error) {
            console.log(error)
        }
    }
  
   }

   const onChange=()=>{
       setopenSave(false)
       router.back()
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
<>
<PageLayout>
     <PageHeader title={accountTranslations.accountTitle}/>
     
    <View className='bg-white shadow-primary-500 shadow-md rounded-md p-6 w-full  flex items-center space-y-4'>
   <View className='flex items-center'>
   <Avatar size='Large' url={account?.avatar}/> 
   <Text className='text-lg font-medium'>{account?.name}</Text>
   <Text className='text-neutral-400'>{account?.username}</Text>
   </View>
    <Input 
    title={accountTranslations.nameLabel}
    type='text'
    placeholder='Jhone doa'
    value={accountForm.name.value}
    onChange={handleNameChange}
    error={accountForm.name.error}
    />
     {accountForm.name.error ? (
          <Text className='text-red-500 w-full'>{accountForm.name.error}</Text>
        ) : null}
    <Input 
    title={accountTranslations.phoneLabel}
    type='phone'
    placeholder='0779674976'
    value={accountForm.phone.value}
    onChange={handlePhoneChange}
    error=''
    />
 
 <View className='py-4'>
 <QRCode
    value={account?.username} 
    size={200}
   />
 </View>
    <Button onChange={saveChange} title={accountTranslations.saveChangeButton}/>
    </View>
   
 </PageLayout>
 <Alert 
 title={accountTranslations.backNowTitle}
 open={openSave}
 onSave={onChange}
 type='SUCCESS'
 description={accountTranslations.successMessage}
 />
</>
  )
}

export default AccountScreen