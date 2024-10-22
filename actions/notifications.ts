import { config, databases } from "@/libs/appwrite"
import { NotificationType } from "@/types"
import { Query } from "react-native-appwrite"


export const getNotifications=async(account:string)=>{
    try {
        const data=await databases.listDocuments(
            config.database,
            config.notifications,
            [
              Query.equal('account',account),
              Query.orderDesc('$createdAt')
            ]
        )
        const notifications=data.documents.map((item)=>{
           const data :NotificationType={
               id:item.$id,
               account:item.account,
               read:item.read,
               type:item.type,
               storeName:item.storeName,
               storeImage:item.storeImage,
               text:item.text,
               accountuser:item.accountUser,
               date:item.$createdAt
            }

            return data
        })
   
       return notifications
    } catch (error) {
        console.log(error)
    }
}

export const getUnreedNotificationsCount=async(account:string)=>{
    try {
        
        const data=await databases.listDocuments(
            config.database,
            config.notifications,
            [
               Query.and([
                Query.equal('account',account),
                Query.equal('read',false)
               ])
            ]
        )

        return data.total
    } catch (error) {
        console.log(error)
    }
}

export const markAsRead=async(id:string)=>{
    try {
        const data=await databases.updateDocument(
            config.database,
            config.notifications,
            id,
            {
                read:true
            }
        )
        const notification :NotificationType={
            id:data.$id,
            account:data.account,
            read:data.read,
            type:data.type,
            storeName:data.storeName,
            storeImage:data.storeImage,
            text:data.text,
            accountuser:data.accountUser,
            date:data.$createdAt
         }

      return notification
    } catch (error) {
        console.log(error)
    }
}

export const markAllasRead=async(accountUser:string,type:'debt'|'payment')=>{
      try {
        const data=await databases.listDocuments(
            config.database,
            config.notifications,
            [
                Query.orderAsc('$createdAt'),
               Query.and(
              [  
                Query.equal('accountUser',accountUser),
                Query.equal('read',false),
                Query.equal('type',type)
            ]
               )

            ]
        )
       data.documents.map(async(item)=>{
           await databases.updateDocument(
            config.database,
            config.notifications,
            item.$id,
            {
                read:true
            }
           )
       })

      } catch (error) {
        
      }
}