import { View, Text } from 'react-native'
import React from 'react'
import PageLayout from '@/components/ui/PageLayout'
import PageHeader from '@/components/ui/PageHeader'
import CardLayout from '@/components/ui/CardLayout'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'

const PasswordScreen = () => {
    
  return (
    <PageLayout>
        <PageHeader title='Password'/>
<View>
<CardLayout>
        <View className='space-y-4'>
        <Input 
            error='' 
            onChange={()=>{}} 
            placeholder='*******'
            title='Password'
            type='password'
            value=''
            />
               <Input 
            error='' 
            onChange={()=>{}} 
            placeholder='*******'
            title='Confrim password'
            type='password'
            value=''
            />

            <Button onChange={()=>{}} title='Save Change'/>
        </View>
        </CardLayout>
</View>
    </PageLayout>
  )
}

export default PasswordScreen