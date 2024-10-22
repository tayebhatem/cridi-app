import { View, Text, TouchableOpacity } from 'react-native'
import React, { ReactNode } from 'react'
import Avatar from '../ui/Avatar'
import { router } from 'expo-router'
import CardLayout from '../ui/CardLayout'
import { NotificationType } from '@/types'
import useLanguageStore from '@/stores/useLanguageStore'
import { markAsRead } from '@/actions/notifications'
import TimeAgo from '../ui/TimeAgo'

const NotificationItem = ({notification}:{notification:NotificationType}) => {
    const {language}=useLanguageStore()
    const navigate=async()=>{
         
           try {
            if(notification.type==='debt')   router.push(`../../debts/${notification.accountuser}`)
              if(notification.type==='payment')   router.push(`../../payments/${notification.accountuser}`)
                if(notification.type==='publication')   router.push('/')
         if(!notification.read)  {
            await markAsRead(notification.id)
         }
           
           } catch (error) {
            console.log(error)
           }
    }

  return (
    <TouchableOpacity
    className={`flex flex-row p-4 border-b border-b-neutral-200 dark:border-dark-200  overflow-hidden  gap-x-2  items-start  ${!notification.read && 'bg-neutral-100'}`}
      activeOpacity={0.8} 
      onPress={navigate}>
   

<Avatar size='Small' url={notification.storeImage} uplaod/>

<View className='space-y-2   flex-1'>
<View className='flex flex-row items-center justify-between space-x-8 '>
<Text className='capitalize text-left text-black dark:text-white  font-kufi-semi-bold text-lg'>
  {notification.storeName}
</Text>
      <TimeAgo date={notification.date}/>
</View>
  <Text className='text-neutral-400 font-kufi  text-left  ' numberOfLines={1} >
    {
        notification.type==='debt' ||  notification.type==='payment'?language?.id==='en'?`${notification.text} added by ${notification.storeName}`:language?.id==='fr'?`${notification.text} ajouté par ${notification.storeName}`:`تمت إضافة ${notification.text}  بواسطة ${notification.storeName}`:
     
        notification.text
    }
  </Text>
</View>
<View className='self-center'>
{ 
  <Text className={` w-2 h-2  rounded-full ${notification.read ?'bg-transparent':'bg-blue-500'}`}></Text>
  }
</View>

  </TouchableOpacity>
  )
}

export default NotificationItem