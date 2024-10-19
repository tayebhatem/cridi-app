import { View, Text } from 'react-native'
import React, { useState } from 'react'
import PageLayout from '@/components/ui/PageLayout'
import PageHeader from '@/components/ui/PageHeader'
import CardLayout from '@/components/ui/CardLayout'
import Button from '@/components/ui/Button'
import TextArea from '@/components/ui/TextArea'
import Alert from '@/components/ui/Alert'
import { router } from 'expo-router'
import useLanguageStore from '@/stores/useLanguageStore'
import { reportTranslation } from '@/constants/translation'
import { sendReport } from '@/libs/appwrite'
import useAccountStore from '@/stores/useAccountStore'

const ReportPage = () => {
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const{account}=useAccountStore()
  const [showSuccess, setshowSuccess] = useState(false)
  const { language } = useLanguageStore();
  const report=reportTranslation(language)
    const onSave=async()=>{
     if(message.length>0){
        //send report message
      if(account){
        
        const data=await sendReport(message,account.id)
 
       if(data) setshowSuccess(true)
      }
     }else{
        setError(report.errorMessageRequired)
     }
    }
  return (
 <>
  <PageLayout>
    <PageHeader title={report.reportTitle}/>
   <View>
   <CardLayout>
    <TextArea title={report.messageTitle} onChange={setMessage} error={error} placeholder={report.messagePlaceholder} value={message} />
    {error && (
          <Text  className='text-red-500 font-kufi '>{error}</Text>
        ) }
        <Button title={report.confirmButton} onChange={onSave}/>
       
        </CardLayout>
   </View>
  </PageLayout>
  <Alert 
  open={showSuccess}
  type='SUCCESS'
  title={report.backToSettings}
  description={report.reportSuccessMessage} 
  onSave={()=>{
    setshowSuccess(false)
    router.back()}}/>
 </>
  )
}

export default ReportPage