import { config, databases } from "@/libs/appwrite"
import {  AccountUserType, StoreType } from "@/types"
import { Query } from "react-native-appwrite"


export const getAccountStores=async(account:string,limit:number)=>{
   try {
    const data=await databases.listDocuments(
        config.database,
        config.accountUser,
        [
            Query.limit(limit),
           Query.equal('account',account),
           Query.equal('accepted',true)
        ]
    )
     const stores=data.documents.map((item)=>{
    const storeData:StoreType={
        id:item.user.$id,
        name:item.user.name,
        adress:item.user.adress,
        phone:item.user.phone,
        avatar:item.user.avatar

    }

    return storeData
     })

     return stores

   } catch (error) {
    console.log(error)
   }
}

export const getStores=async()=>{
    try {
     const data=await databases.listDocuments(
         config.database,
         config.store,
         [
           
           Query.equal('type','STORE')
        ]
     )
      const stores=data.documents.map((item)=>{
     const storeData:StoreType={
        id:item.$id,
        name:item.name,
        adress:item.adress,
        phone:item.phone,
        avatar:item.avatar
 
     }
 
     return storeData
      })
 
      return stores
 
    } catch (error) {
     console.log(error)
    }
 }
 export const getStore=async(id:string)=>{
    try {
     const data=await databases.getDocument(
         config.database,
         config.store,
        id
     )
  
     const storeData:StoreType={
            id:data.$id,
            name:data.name,
            adress:data.adress,
            phone:data.phone,
            avatar:data.avatar
    }
    return storeData
    } catch (error) {
     console.log(error)
    }
 }
export const getStoreByAccount=async(userAccount:string)=>{
    try {
     const data=await databases.getDocument(
         config.database,
         config.accountUser,
        userAccount
     )
     const storeData:StoreType={
            id:data.user.$id,
            name:data.user.name,
            adress:data.user.adress,
            phone:data.user.phone,
            avatar:data.user.avatar
    }
    return storeData
    } catch (error) {
     console.log(error)
    }
 }

 export const getAccountStore=async(account:string,user:string)=>{
    try {
     const data=await databases.listDocuments(
         config.database,
         config.accountUser,
         [
          
            Query.and([
                Query.equal('account',account),
                Query.equal('user',user)
            ])
         ]
     )
     
 
     const accountUser:AccountUserType={
        id:data.documents[0].$id,
        accepted:data.documents[0].accepted,
        store:{
          id:data.documents[0].user.$id,
          adress:data.documents[0].user.adress,
          avatar:data.documents[0].user.avatar,
          name:data.documents[0].user.name,
          phone:data.documents[0].user.phone
        }
       }
       return accountUser
 
    } catch (error) {
     console.log(error)
    }
 }


