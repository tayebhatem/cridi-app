import { View, Text, Switch } from 'react-native'
import React from 'react'
import PageLayout from '@/components/ui/PageLayout'
import PageHeader from '@/components/ui/PageHeader'
import CardLayout from '@/components/ui/CardLayout'
import useLanguageStore from '@/stores/useLanguageStore'
import { notificationsTranslation } from '@/constants/translation'
import useNotificationsStore from '@/stores/useNotificationsStore'

const NotificationsScreen = () => {
    const { language } = useLanguageStore();
    const {
    adsNotifications,
    messagesNotification,
    setAdsNotification,
    setMessagesNotification,
    setTransactionsNotification,
    transactionsNotifications,
    requestNotifications,
    setRequestsNotification

    }=useNotificationsStore()
    const notifications=notificationsTranslation(language)
  return (
    <PageLayout>
        <PageHeader title={notifications.notificationsTitle}/>
       <View>
       <CardLayout>
            <View className='flex flex-row items-center justify-between py-2 border-b border-neutral-100 dark:border-dark-300'>
                <Text className='text-base text-neutral-500 font-kufi leading-9'>{notifications.messagesNotifications}</Text>
                <Switch value={messagesNotification} onValueChange={()=>setMessagesNotification(!messagesNotification)}   />
            </View>
            <View className='flex flex-row items-center justify-between py-2 border-b border-neutral-100 dark:border-dark-300'>
                <Text className='text-base text-neutral-500 font-kufi leading-9'>{notifications.debtsNotifications}</Text>
                <Switch value={transactionsNotifications} onValueChange={()=>setTransactionsNotification(!transactionsNotifications)}  />
            </View>
            <View className='flex flex-row items-center justify-between py-2'>
                <Text className='text-base text-neutral-500 font-kufi leading-9'>{notifications.publicationsNotifications}</Text>
                <Switch value={adsNotifications} onValueChange={()=>setAdsNotification(!adsNotifications)} />
            </View>
            <View className='flex flex-row items-center justify-between py-2'>
                <Text className='text-base text-neutral-500 font-kufi leading-9'>{notifications.requestsNotifications}</Text>
                <Switch value={requestNotifications} onValueChange={()=>setRequestsNotification(!requestNotifications)} />
            </View>
        </CardLayout>
       </View>
    </PageLayout>
  )
}

export default NotificationsScreen