
import React, { ReactNode, useEffect, useState } from 'react'
import { StreamChat } from 'stream-chat';
import useAccountStore from '@/stores/useAccountStore';
import  {Chat, OverlayProvider, Streami18n} from 'stream-chat-expo'
import Loader from '@/components/ui/Loader';
import useLanguageStore from '@/stores/useLanguageStore';
import useNotificationsStore from '@/stores/useNotificationsStore';


const ChatProvider = ({children}:{children:ReactNode}) => {
    const{language}=useLanguageStore()
    const streami18n = new Streami18n({ language: 'en' });
    const {account}=useAccountStore()
    const [isConnected, setIsConnected] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const client = StreamChat.getInstance(process.env.EXPO_PUBLIC_STREAM_KEY || '');
    const{setUnreadMessagesCount}=useNotificationsStore()
    useEffect(() => { 
     const connect=async()=>{
        setIsLoading(true)
      if(account){
       try {
        const token=client.devToken(account.id)
      
      await client.connectUser(
            {
              id: account.id,
              name: account.name,
              image: account.avatar,
            },
            token,
          );
          
      if(client.user){
        
        setUnreadMessagesCount(client.user.total_unread_count as number)
        
      }
       
        setIsConnected(true)
       } catch (error) {
       if(error instanceof Error){
        console.log(error.message)
       }
       }finally{
        setIsLoading(false)
       }

      }
     }
 

    !isConnected &&  connect()

     
    }, [account])
   
    useEffect(() => {
        // Update the unread count whenever it changes
        if (isConnected) {
         
            client.on(event => {
                if (event.total_unread_count !== undefined) {
                    setUnreadMessagesCount(event.total_unread_count)
                   
                }
             
                
            });
      
        
        }
      }, [isConnected, client]);
   
    
   useEffect(() => {
   if(language?.id==='en')  {
    streami18n.setLanguage('en');
   }else{
streami18n.setLanguage('fr');
   }
   }, [language])
   
    if(isLoading) return <Loader/>
  return (
   <>
   <OverlayProvider value={{style:{colors:{accent_blue:'#059669'}}}} i18nInstance={streami18n}>
   <Chat client={client} i18nInstance={streami18n}>
   {children}
   </Chat>
  
   </OverlayProvider>
  
   </>
  )
}

export default ChatProvider