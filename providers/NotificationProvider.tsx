import { View, Text } from 'react-native'
import React, { ReactNode, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import useNotificationsStore from '@/stores/useNotificationsStore'
import useAccountStore from '@/stores/useAccountStore'
import { getUnreedNotificationsCount } from '@/actions/notifications'

const NotificationProvider = ({children}:{children:ReactNode}) => {
const {
  setAdsNotification,
  setMessagesNotification,
  setTransactionsNotification,
  setUnreadNotificationsCount
}=useNotificationsStore()
const{account}=useAccountStore()
  useEffect(() => {
    const fetchNotificationsCount=async()=>{

      if(account){
      
        try {
          const count=await getUnreedNotificationsCount(account.id)
          if(!count) return
         
          setUnreadNotificationsCount(count)
        } catch (error) {
          
        }
      }
      }
      fetchNotificationsCount()


    const setNotifications=async()=>{
          try {
            const ads= await AsyncStorage.getItem('ads-notifications')
          const transactions= await AsyncStorage.getItem('transaction-notifications')
          const messages= await AsyncStorage.getItem('messages-notifications')
           if(!ads){
            setAdsNotification(true)
           }
           if(!transactions){
                    setTransactionsNotification(true)
           }
           if(!messages){
                setMessagesNotification(true)
           }
          } catch (error) {
            console.log(error)
          }
    }
    setNotifications()
  }, [])
  
  return (
   <>
   {children}
   </>
  )
}

export default NotificationProvider