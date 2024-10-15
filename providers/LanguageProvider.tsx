
import React, { ReactNode, useEffect, useState } from 'react'

import { languageData } from '@/constants/Language'
import AsyncStorage from '@react-native-async-storage/async-storage';
import useLanguageStore from '@/stores/useLanguageStore';

const LanguageProvider = ({children}:{children:ReactNode}) => {
    const {setLanguage}=useLanguageStore()
    const [isLoading, setisLoading] = useState(false)

    useEffect(() => {
      const getLanguage=async()=>{
        setisLoading(true)
        try {
            const language=await  AsyncStorage.getItem('language')
           
            if(!language){
                AsyncStorage.setItem('language','fr')       
            }else{
                
            }
            const lang=languageData.find((item)=>item.id===language)
           if(lang){
               setLanguage(lang)
           }
          } catch (error) {
            console.log(error)
          }finally{
            setisLoading(false)
          }
      }
      getLanguage()
    }, [])

  
  return (
  <>
  {children}
  </>
  )
}

export default LanguageProvider