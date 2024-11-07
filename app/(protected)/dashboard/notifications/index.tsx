import { View, Text, FlatList, RefreshControl } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import useLanguageStore from '@/stores/useLanguageStore'
import { NotificationType } from '@/types'
import { getNotifications, markAsRead } from '@/actions/notifications'
import useAccountStore from '@/stores/useAccountStore'
import NotificationItem from '@/components/notifications/NotificationItem'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TouchableOpacity } from 'react-native'
import useNotificationsStore from '@/stores/useNotificationsStore'
import EmptyList from '@/components/ui/EmptyList'
import { CheckCheck } from '@tamagui/lucide-icons'

const NotificationScreen = () => {
  const {language}=useLanguageStore()

   const {account}=useAccountStore()
  const {
    notifications,
    setNotifications,
    updateNotification,
    setUnreadNotificationsCount
  }=useNotificationsStore()
   const [isLoading, setIsLoading] = useState(false)

  
const markAllAsRead=()=>{
  try {
      notifications.map(async(item)=>{
    try {
     await markAsRead(item.id)
  
    } catch (error) {

    }
      })
    setUnreadNotificationsCount(0)
  } catch (error) {
    console.log(error)
  }
}
  



const fetchNotifications=useCallback(async()=>{
  if(account){
    try {
      const data=await getNotifications(account.id)
      if(!data) return
      setNotifications(data)
   } catch (error) {
     console.log(error)
   }
  }
  
  },[account])

  useEffect(() => {
    fetchNotifications()
  }, [account])



  
  return (
   <SafeAreaView className='h-full py-4  bg-white dark:bg-dark-500 space-y-4'>
     <View className='px-4 flex flex-row justify-between items-center' >
  <Text className='text-lg font-kufi-medium text-left'>
  {language?.id==='en'?"Notifications":language?.id==='fr'?"Notifications":"الإشعارات"}
  </Text>
 {
  /**
   *  <TouchableOpacity 
  onPress={markAllAsRead}
  activeOpacity={0.8} 
  className={`flex flex-row items-center gap-x-1 ${language?.id==='ar' && 'flex-row-reverse'}`}>
    <CheckCheck size={16} color={"#059669"}/>
    <Text className='text-primary-500 font-kufi-semi-bold text-xs leading-6'>
    {language?.id==='en'?"Mark all as read":language?.id==='fr'?"Marquer tout comme lu":"تحديد الكل كمقروء"}
    </Text>
  </TouchableOpacity>
   */
 }
   </View>
   
    
    <FlatList 
 className='h-full'
 refreshControl={
  <RefreshControl refreshing={isLoading}  onRefresh={fetchNotifications}/>
 }
 showsHorizontalScrollIndicator={false}
 showsVerticalScrollIndicator={false}
 data={notifications}
 contentContainerStyle={{margin:notifications.length>0?0:'auto'}}
 keyExtractor={item=>item.id}
 renderItem={(item)=>(<NotificationItem notification={item.item}/>)}
 ListEmptyComponent={()=>(
<View>
  <EmptyList 
 subText={language?.id === 'en' 
  ? 'You will see notifications here once they arrive.' 
  : language?.id === 'fr' 
  ? 'Vous verrez les notifications ici dès qu\'elles arriveront.' 
  : 'سترى الإشعارات هنا بمجرد وصولها.'}
title={language?.id==='en'?"There are no notifications currently.":language?.id==='fr'?"Il n'y a aucune notification actuellement.":"لا يوجد إشعارات حاليا."}/>
</View>
 )}
 />
   </SafeAreaView>
  )
}

export default NotificationScreen