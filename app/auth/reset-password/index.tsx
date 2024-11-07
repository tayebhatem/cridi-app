import { View, Text } from 'react-native'
import React, { useState } from 'react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { updatePassword } from '@/libs/appwrite'
import useAccountStore from '@/stores/useAccountStore'
import { router } from 'expo-router'
import useLanguageStore from '@/stores/useLanguageStore'
import { passwordTranslation } from '@/constants/translation'
import ConfirmModal from '@/components/ui/ConfirmModal'
import { SafeAreaView } from 'react-native-safe-area-context'
import ErrorMessage from '@/components/ui/ErrorMessage'
import { useToast } from 'react-native-toast-notifications'

const ResetPasswordScreen = () => {
    const {account,clearAccount}=useAccountStore()
    const toast = useToast();
    const [open, setopen] = useState(false)
    const [passwordForm, setPasswordFom] = useState({
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

      const confirm=async()=>{
       if(account){
        try {
            
          const data=  await updatePassword(account.id,passwordForm.newPassword.value)  
          if(data){
            clearAccount()
            toast.show(
              language?.id === 'en'
                ? 'Password updated successfully'
                : language?.id === 'fr'
                ? 'Mot de passe mis à jour avec succès'
                : 'تم تحديث كلمة المرور بنجاح',
              {
                type: "success"
              }
            );
            
          router.replace('../sign-in')
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
  <SafeAreaView className='bg-white p-6 space-y-4 h-full'>
  <View>
  <Text className="text-2xl font-kufi-semi-bold">
    {language?.id === 'en' ? 'Reset password' : language?.id === 'fr' ? 'Réinitialiser le mot de passe' : "إعادة تعيين كلمة المرور"}
  </Text>
  <Text className="text-neutral-400 font-kufi leading-6">
    {language?.id === 'en' ? 'Please enter your email to receive an OTP.' : language?.id === 'fr' ? 'Veuillez entrer votre email pour recevoir un OTP.' : 'يرجى إدخال بريدك الإلكتروني لتلقي رمز التحقق.'}
  </Text>
</View>

<View>
      <Input 
            error={passwordForm.newPassword.error}
           onChange={handleNewPasswordChange} 
           placeholder='*******'
           title={password.newPassword}
           type='password'
           value={passwordForm.newPassword.value}
           />
           <ErrorMessage error={passwordForm.newPassword.error }/>
              <Input 
           error={passwordForm.confirmNewPassword.error}
           onChange={handleConfrimNewPasswordChange} 
           placeholder='*******'
           title={password.confirmPassword}
           type='password'
           value={passwordForm.confirmNewPassword.value}
           />
              <ErrorMessage error={passwordForm.confirmNewPassword.error }/>
      </View>

      <View>
      <Button onChange={onSave} title={password.saveChangeButton}/>
      </View>
  </SafeAreaView>
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

  
    </>
  )
}

export default ResetPasswordScreen