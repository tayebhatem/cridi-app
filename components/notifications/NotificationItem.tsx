import { View, Text, TouchableOpacity } from 'react-native'
import React, { ReactNode, useState } from 'react'
import Avatar from '../ui/Avatar'
import { router } from 'expo-router'
import { NotificationType } from '@/types'
import useLanguageStore from '@/stores/useLanguageStore'
import { deleteNotificationItem, markAsRead } from '@/actions/notifications'
import TimeAgo from '../ui/TimeAgo'
import { CheckCheck, MoreVertical, Trash, Trash2} from '@tamagui/lucide-icons'
import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons'
import Drawer from '../ui/Drawer'
import useNotificationsStore from '@/stores/useNotificationsStore'
import { useToast } from 'react-native-toast-notifications'
import BottomSheet from '../ui/BottomSheet'
const NotificationItem = ({notification}:{notification:NotificationType}) => {
  const [openMore, setopenMore] = useState(false)
    const {language}=useLanguageStore()
    const {updateNotification,
      decrementUnreadNotificationsCount,
      deleteNotification}=useNotificationsStore()
      const toast = useToast();
    const navigate=async()=>{    
           try {
            if(notification.type==='debt')   router.push(`../../debts/${notification.accountuser}`)
              if(notification.type==='payment')   router.push(`../../payments/${notification.accountuser}`)
                if(notification.type==='request')   router.push(`../../store/${notification.text}`)
                if(notification.type==='publication')   router.push('/')
         if(!notification.read)  {
            await markAsRead(notification.id)
         }
           
           } catch (error) {
            console.log(error)
           }
    }
   const markAsead=async()=>{
    try {
      decrementUnreadNotificationsCount()
      setopenMore(false)
     const data= await markAsRead(notification.id)
     if(data) updateNotification(data)
     
    
    } catch (error) {
      
    }
   }
   const handleDelete=async()=>{
    try {
      deleteNotification(notification.id)
      setopenMore(false)
      toast.show(
        language?.id === 'en'
          ? 'Notification deleted successfully'
          : language?.id === 'fr'
          ? 'Notification supprimée avec succès'
          : 'تم حذف الإشعار بنجاح',
        {
          type: "success"
        }
      );
       
      await deleteNotificationItem(notification.id)
   
    } catch (error) {
      console.log(error)
    }
   }
  return (
   <>
    <TouchableOpacity
    className={`flex flex-row p-4 border-b border-b-neutral-200 dark:border-dark-200  overflow-hidden  gap-x-2  items-start  ${!notification.read && 'bg-neutral-100'}`}
      activeOpacity={0.8} 
      onPress={navigate}>
   

<View className='relative'>
<Avatar size='Small' url={notification.storeImage} uplaod/>
<View className={`absolute ${notification.type==='debt'?'bg-green-500':notification.type==='payment'?'bg-pink-500':'bg-blue-500'} p-1 rounded-full border-white dark:border-dark-500 border right-0 -bottom-2`}>
{
  notification.type==='debt'?<Ionicons  name='receipt-outline' size={12} color={'#FFF'}/>
:notification.type==='payment'?
<MaterialIcons name="currency-exchange" size={12} color="#FFF"  />:
<Feather name="user-plus" size={12} color="#FFF" />
}
</View>

</View>

<View className='flex-1'>
<View className='flex flex-row items-center justify-between space-x-8 '>
<Text className='capitalize text-left text-black dark:text-white  font-kufi-semi-bold text-base'>
  {notification.storeName}
</Text>
      <TimeAgo date={notification.date}/>
</View>
  <Text className='text-neutral-400 font-kufi  text-left  ' numberOfLines={1} >
    {
        notification.type==='debt' ||  notification.type==='payment'?language?.id==='en'?`${notification.text} added by ${notification.storeName}`:language?.id==='fr'?`${notification.text} ajouté par ${notification.storeName}`:`تمت إضافة ${notification.text}  بواسطة ${notification.storeName}`:
        notification.type==='request'?
     language?.id==='en'?`${notification.storeName} accepted your request`:language?.id==='fr'?`${notification.storeName} a accepté votre demande`:`${notification.storeName} قبل طلبك`
       : notification.text
    }
  </Text>
</View>
<View className='self-center flex space-y-5 items-center'>
  <TouchableOpacity activeOpacity={0.8} onPress={()=>setopenMore(true)}>
  <MoreVertical size={24}/>
  </TouchableOpacity>
  { 
  <Text className={` w-2 h-2  rounded-full ${notification.read ?'bg-transparent':'bg-blue-500'}`}></Text>
  }
</View>

  </TouchableOpacity>


  <BottomSheet 
 description={language?.id==='en' 
    ? "Choose an action to manage your item." 
    : language?.id==='fr' 
    ? "Choisissez une action pour gérer votre élément." 
    : "اختر إجراءً لإدارة العنصر"} 
  title={language?.id==='en'?"More":language?.id==='fr'?"Plus":"المزيد"} 
  open={openMore} 
  setOpen={setopenMore} >
   <TouchableOpacity 
   onPress={handleDelete}
   activeOpacity={0.6} 
   className='flex flex-row items-center space-x-4 border-b border-neutral-200 py-3'>
    <Trash2 size={24}/>
    <Text className='text-base font-kufi leading-9'>{language?.id==='en'?"Delete":language?.id==='fr'?"Supprimer":"حذف"}</Text>
   </TouchableOpacity>
   <TouchableOpacity 
   onPress={markAsead}
   activeOpacity={0.6} 
   className='flex flex-row items-center space-x-4 border-b border-neutral-200 py-2'>
    <CheckCheck size={24}/>
    <Text className='text-base font-kufi leading-9'>{language?.id==='en'?"Mark as read":language?.id==='fr'?"Marquer comme lu":"تحديد كمقروء"}</Text>
   </TouchableOpacity>
  </BottomSheet>
   </>
  )
}

export default NotificationItem