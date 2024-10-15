import { View, Text } from 'react-native'
import React from 'react'
import PageLayout from '@/components/ui/PageLayout'
import PageHeader from '@/components/ui/PageHeader'
import CardLayout from '@/components/ui/CardLayout'
import useLanguageStore from '@/stores/useLanguageStore'

const NotificationScreen = () => {
  const {language}=useLanguageStore()
  return (
   <PageLayout>
    <PageHeader title={language?.id==='en'?"Notifications":language?.id==='fr'?"Notifications":"الإشعارات"}/>
   <View>
   <CardLayout >
      <Text className='text-center text-neutral-400 font-kufi'>
        {language?.id==='en'?"There are no notifications currently":language?.id==='fr'?"Il n'y a aucune notification actuellement":"لا يوجد إشعارات حاليا"}
      </Text>
    </CardLayout>
   </View>
   </PageLayout>
  )
}

export default NotificationScreen