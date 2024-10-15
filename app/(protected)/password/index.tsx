import { View, Text } from 'react-native'
import React, { useState } from 'react'
import PageLayout from '@/components/ui/PageLayout'
import PageHeader from '@/components/ui/PageHeader'
import CardLayout from '@/components/ui/CardLayout'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { updatePassword } from '@/libs/appwrite'
import useAccountStore from '@/stores/useAccountStore'
import Alert from '@/components/ui/Alert'
import { router } from 'expo-router'
import useLanguageStore from '@/stores/useLanguageStore'
import { passwordTranslation } from '@/constants/translation'

const PasswordScreen = () => {
    const {account}=useAccountStore()
    const [showSuccess, setshowSuccess] = useState(false)
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

      const validateForm = () => {
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
        return valid;
      };

      
      const onSave=async()=>{
     const isValid=validateForm()
    
     if(isValid && account){
        try {
            
        const data=  await updatePassword(account.id,passwordForm.currentPassword.value,passwordForm.newPassword.value)  
        if(data){
          setshowSuccess(true)
        }
        } catch (error) {
            if(error instanceof Error){
                if(error.message==='Current password is wrong')
                    setPasswordFom((prevState) => ({
                        ...prevState,
                        currentPassword: {
                          ...prevState.currentPassword,
                          error: password.wrongCurrentPassword,
                        },
                      }));
            }
        }
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
          <Text style={{ color: 'red' }}>{passwordForm.currentPassword.error}</Text>
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
          <Text style={{ color: 'red' }}>{passwordForm.newPassword.error}</Text>
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
          <Text style={{ color: 'red' }}>{passwordForm.confirmNewPassword.error}</Text>
        ) : null}
            <Button onChange={onSave} title={password.saveChangeButton}/>
        </View>
        </CardLayout>
</View>
    </PageLayout>
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