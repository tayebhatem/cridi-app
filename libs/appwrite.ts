
import { Client,  ID,Databases, Query } from 'react-native-appwrite';
import * as SecureStore from 'expo-secure-store';
import { AccountType, publicationType } from '@/types';
export const client = new Client().setEndpoint("https://cloud.appwrite.io/v1")
    .setProject('669a6a36003c2cc6eecd')
    .setPlatform('com.tayebhatem.cridi');
export const databases=new Databases(client)
export const config={
    database:'66a02c2c0037f2813b8f',
    accountSession:'6707a05800140d008a02',
    account:'66b09b570034158307ad',
    accountUser:'66f6d4d1003bc312bdf3',
    transactions:'66a6c74f00196e1fa95b',
    payments:'66a6c7f8003df82e5105',
    publications:'671070c4002b21cb9b62',
    notifications:'671106110007cf9a44a5',
    reports:'671105b5003c7b3bc573'
}
async function save(key:string, value:string) {
    await SecureStore.setItemAsync(key, value);
  }


export const login=async(username:string,password:string)=>{
  
      const data=await databases.listDocuments(
        config.database,
        config.account,
        [
          Query.equal('username',username),
        ]
      )
      if(data.documents[0]){
      if(data.documents[0].password!==password) throw new Error('Wrong password.')  

    const session =await createSession(data.documents[0].$id)
    if(session) await save('session',session.$id) 
      return session
      }else{
        throw new Error('Wrong username.')
      }
}




export const createSession=async(account:string)=>{
      try {
        const expire=new Date()
        expire.setDate(expire.getDate() + 365);
        const session=await databases.createDocument(
            config.database,
            config.accountSession,
            ID.unique(),
            {
                account,
                expire
            }
        )

        return session
      } catch (error) {
        console.log(error)
      }
}
export const getSession=async()=>{
  const sessionId=await SecureStore.getItemAsync('session')
        
  if(sessionId){
      
  const session=await databases.getDocument(
      config.database,
      config.accountSession,
   sessionId
  )

  return session
  }
}

export const deleteSession=async()=>{
    try {
        const sessionId=await SecureStore.getItemAsync('session')
   if(sessionId){
    const response=await databases.deleteDocument(
        config.database,
        config.accountSession,
        sessionId
      )

      if(response){
        await SecureStore.deleteItemAsync('sesssion')

        return response
      }
   }
    } catch (error) {
        console.log(error)
    }
}


export const updateAccount=async(id:string,name:string,phone:string)=>{

      try {
        const data=await databases.updateDocument(
          config.database,
          config.account,
          id,{
            name,
            phone          
          }
        )
        const updatedAccount:AccountType={
          id:data.$id,
          name:data.name,
          avatar:data.avatar,
          type:data.type,
          phone:data.phone,
          username:data.username
        }

        return updatedAccount
      } catch (error) {
        console.log(error)
      }
}


export const  getAccount=async(account:string)=>{
      try {
        const data=await databases.getDocument(
          config.database,
          config.account,
          account
        )

        return data
      } catch (error) {
       
      }
}
export const checkCurrentPassword=async(id:string,oldPassword:string)=>{
  const account=await getAccount(id)
  if(!account) return

  const currentPassword=account.password
 
  if(currentPassword!==oldPassword){ return false }else{return true}

}
export const updatePassword=async(id:string,newpassword:string)=>{
        const data=await databases.updateDocument(
          config.database,
          config.account,
          id,
          {
            password:newpassword
          }
        )
       
        return data
    
}


export const createPublication=async()=>{
try {
  
} catch (error) {
  
}
}

export const getPublications=async()=>{
    const data=await databases.listDocuments(
      config.database,
      config.publications
    )

    const pubs=data.documents.map((item)=>{
       const data:publicationType={
        id:item.$id,
        title:item.title,
        description:item.description,
        image:item.image
       }
       return data
    })

    return pubs
}


export const sendReport=async(message:string,account:string)=>{
      try {
        const data=await databases.createDocument(
          config.database,
          config.reports,
          ID.unique(),
          {
            account,
            message
          }
        )

        return data
      } catch (error) {
        console.log(error)
      }
}