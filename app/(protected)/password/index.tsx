import { View, Text } from 'react-native'
import React, { useState } from 'react'
import PageLayout from '@/components/ui/PageLayout'
import PageHeader from '@/components/ui/PageHeader'
import CardLayout from '@/components/ui/CardLayout'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { checkCurrentPassword, updatePassword } from '@/libs/appwrite'
import useAccountStore from '@/stores/useAccountStore'
import Alert from '@/components/ui/Alert'
import { router } from 'expo-router'
import useLanguageStore from '@/stores/useLanguageStore'
import { passwordTranslation } from '@/constants/translation'
import ConfirmModal from '@/components/ui/ConfirmModal'

const PasswordScreen = () => {
    const {account}=useAccountStore()
    const [showSuccess, setshowSuccess] = useState(false)
    const [open, setopen] = useState(false)
    const [passwordForm, setPasswordFom] = useState({
        currentPassword: {
          value: '',
          error: '',
        },
        newPassword: {
          value: '',
          error: '',
        },
        confirmNewPassword: {
            value: '',
            error: '',
          },
      });
    const {language}=useLanguageStore()
    const password=passwordTranslation(language)
      const handleCurrentPasswordChange = (value: string) => {
        setPasswordFom((prevState) => ({
          ...prevState,
          currentPassword: {
            ...prevState.currentPassword,
            value,
            error: '', // Clear error on input change
          },
        }));
      };
      const handleNewPasswordChange = (value: string) => {
        setPasswordFom((prevState) => ({
          ...prevState,
          newPassword: {
            ...prevState.newPassword,
            value,
            error: '', // Clear error on input change
          },
        }));
      };
      const handleConfrimNewPasswordChange = (value: string) => {
        setPasswordFom((prevState) => ({
          ...prevState,
          confirmNewPassword: {
            ...prevState.confirmNewPassword,
            value,
            error: '', // Clear error on input change
          },
        }));
      };

      const validateForm = async() => {
        let valid = true;
    
        if (passwordForm.currentPassword.value.trim().length < 6) {
          setPasswordFom((prevState) => ({
            ...prevState,
            currentPassword: {
              ...prevState.currentPassword,
              error: password.passwordTooShort,
            },
          }));
          valid = false;
        }
        if (passwordForm.newPassword.value.trim().length < 6) {
            setPasswordFom((prevState) => ({
              ...prevState,
              newPassword: {
                ...prevState.newPassword,
                error: password.passwordTooShort,
              },
            }));
            valid = false;
          }

          if (passwordForm.confirmNewPassword.value.trim().length < 6) {
            setPasswordFom((prevState) => ({
              ...prevState,
              confirmNewPassword: {
                ...prevState.confirmNewPassword,
                error: password.passwordTooShort,
              },
            }));
            valid = false;
          }

          if (passwordForm.confirmNewPassword.value!==passwordForm.newPassword.value) {
            setPasswordFom((prevState) => ({
              ...prevState,
              confirmNewPassword: {
                ...prevState.confirmNewPassword,
                error: password.passwordMismatch,
              },
            }));
            valid = false;
          }

         if(!account) return  
         const isOldPassword=await checkCurrentPassword(account?.id,passwordForm.currentPassword.value)
         if(!isOldPassword) {
          setPasswordFom((prevState) => ({
            ...prevState,
            currentPassword: {
              ...prevState.currentPassword,
              error: password.wrongCurrentPassword,
            },
          }));

          valid = false;
         }
        return valid;
      };

      const confirm=async()=>{
       if(account){
        try {
            
          const data=  await updatePassword(account.id,passwordForm.newPassword.value)  
          if(data){
            setshowSuccess(true)
          }
          } catch (error) {
              if(error instanceof Error){
                console.log(error)
                     
              }
          }
       }
      }
      const onSave=async()=>{
     const isValid=await validateForm()
    
     if(isValid){
       setopen(true)
     }
      }
  return (
   <>
    <PageLayout>
        <PageHeader title={password.passwordTitle}/>
<View>
<CardLayout>
        <View className=''>
        <Input 
            error={passwordForm.currentPassword.error}
            onChange={handleCurrentPasswordChange} 
            placeholder='*******'
            title={password.currentPassword}
            type='password'
            value={passwordForm.currentPassword.value}
            />
              {passwordForm.currentPassword.error ? (
          <Text  className='text-red-500 font-kufi '>{passwordForm.currentPassword.error}</Text>
        ) : null}
        <Input 
             error={passwordForm.newPassword.error}
            onChange={handleNewPasswordChange} 
            placeholder='*******'
            title={password.newPassword}
            type='password'
            value={passwordForm.newPassword.value}
            />
               {passwordForm.newPassword.error ? (
          <Text  className='text-red-500 font-kufi '>{passwordForm.newPassword.error}</Text>
        ) : null}
               <Input 
            error={passwordForm.confirmNewPassword.error}
            onChange={handleConfrimNewPasswordChange} 
            placeholder='*******'
            title={password.confirmPassword}
            type='password'
            value={passwordForm.confirmNewPassword.value}
            />
    {passwordForm.confirmNewPassword.error ? (
          <Text  className='text-red-500 font-kufi'>{passwordForm.confirmNewPassword.error}</Text>
        ) : null}
            <Button onChange={onSave} title={password.saveChangeButton}/>
        </View>
        </CardLayout>
</View>
    </PageLayout>
    <ConfirmModal
  onChange={confirm}
  description={language?.id === 'en' 
    ? "Are you sure you want to change your password?" 
    : language?.id === 'fr' 
    ? "Êtes-vous sûr de vouloir changer votre mot de passe ?" 
    : "هل أنت متأكد أنك تريد تغيير كلمة المرور؟"}
  open={open}
  setOpen={setopen}
  title={language?.id === 'en' 
    ? "Confirm Password Change" 
    : language?.id === 'fr' 
    ? "Confirmer le changement de mot de passe" 
    : "تأكيد تغيير كلمة المرور"}
/>

    <Alert 
    open={showSuccess}
    type='SUCCESS'
    onSave={()=>{    
        router.back()
        setshowSuccess(false)
    }
    }
    title={password.backToSettings}
    description={password.successMessage}
    />
    </>
  )
}

export default PasswordScreen