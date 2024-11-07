import { View, Text, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import PageHeader from '@/components/ui/PageHeader'
import Button from '@/components/ui/Button'
import TextArea from '@/components/ui/TextArea'
import useLanguageStore from '@/stores/useLanguageStore'
import { reportTranslation } from '@/constants/translation'
import { sendReport } from '@/libs/appwrite'
import useAccountStore from '@/stores/useAccountStore'
import ErrorMessage from '@/components/ui/ErrorMessage'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useToast } from "react-native-toast-notifications";
import { AlertCircle, Check, CheckCircle } from '@tamagui/lucide-icons'
import { router } from 'expo-router'


const ReportPage = () => {
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const{account}=useAccountStore()
  const { language } = useLanguageStore();
  const report=reportTranslation(language)
  const toast = useToast();
 
    const onSave=async()=>{
     if(message){
        //send report message
      if(account){
        
        const data=await sendReport(message,account.id)
 
       if(data) {
        toast.show(report.reportSuccessMessage,{
          type:"success"
        });
        setMessage('')
        setError('')
        router.back()
       }
      }
     }else{
        setError(report.errorMessageRequired)
     }
    }

   

  return (
 <>
 <SafeAreaView className='bg-white dark:bg-dark-500 p-6 space-y-4 h-full ' >
    <PageHeader title={report.reportTitle}/>
   <View>
 
    <TextArea title={report.messageTitle} onChange={setMessage} error={error} placeholder={report.messagePlaceholder} value={message} />
    <ErrorMessage error={error}/>
      
   </View>
   <View >
    <Button title={report.confirmButton} onChange={onSave}/>
       
    </View>
   </SafeAreaView>
   
  
 </>
  )
}

export default ReportPage