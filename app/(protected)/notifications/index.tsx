import { View, Text, Switch } from 'react-native'
import React from 'react'
import PageLayout from '@/components/ui/PageLayout'
import PageHeader from '@/components/ui/PageHeader'
import CardLayout from '@/components/ui/CardLayout'
import useLanguageStore from '@/stores/useLanguageStore'
import { notificationsTranslation } from '@/constants/translation'

const NotificationsScreen = () => {
    const { language } = useLanguageStore();
    const notifications=notificationsTranslation(language)
  return (
    <PageLayout>
        <PageHeader title={notifications.notificationsTitle}/>
       <View>
       <CardLayout>
            <View className='flex flex-row items-center justify-between py-2 border-b border-neutral-100'>
                <Text className='text-base text-neutral-500'>{notifications.messagesNotifications}</Text>
                <Switch value={true} disabled />
            </View>
            <View className='flex flex-row items-center justify-between py-2 border-b border-neutral-100'>
                <Text className='text-base text-neutral-500'>{notifications.debtsNotifications}</Text>
                <Switch value={true}  disabled/>
            </View>
            <View className='flex flex-row items-center justify-between py-2 border-b border-neutral-100'>
                <Text className='text-base text-neutral-500'>{notifications.publicationsNotifications}</Text>
                <Switch value={true}  disabled/>
            </View>
        </CardLayout>
       </View>
    </PageLayout>
  )
}

export default NotificationsScreen