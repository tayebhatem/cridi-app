import { config, databases } from "@/libs/appwrite"
import { AccountUserType, StoreType } from "@/types"
import { Query } from "react-native-appwrite"


export const getAccountStores=async(account:string,limit:number)=>{
   try {
    const data=await databases.listDocuments(
        config.database,
        config.accountUser,
        [
            Query.limit(limit),
           
        ]
    )
     const stores=data.documents.map((item)=>{
    const storeData:AccountUserType={
        id:item.$id,
        store:{
            id:item.user.$id,
            name:item.user.name,
            adress:item.user.adress,
            phone:item.user.phone,
            avatar:item.user.avatar
        }

    }

    return storeData
     })

     return stores

   } catch (error) {
    console.log(error)
   }
}


export const getStore=async(userAccount:string)=>{
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
