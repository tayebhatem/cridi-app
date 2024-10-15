import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import Drawer from './Drawer'
import { LanguageType } from '@/types'
import { languageData } from '@/constants/Language'
import useLanguageStore from '@/stores/useLanguageStore'
import { FontAwesome } from '@expo/vector-icons'

const LanguageDrawer = ({open,setOpen}:{open:boolean,setOpen:(open:boolean)=>void}) => {
    const {language,setLanguage}=useLanguageStore();
    
   const seleteLanguage=(language:LanguageType)=>{
    setLanguage(language)
    setOpen(false)
   }
  return (
    <Drawer 
    open={open}
    setOpen={setOpen}
    title={language?.id === 'en' ? 'Language' : language?.id === 'fr' ? 'Langue' : 'اللغة'} 
    description={language?.id==='en'?"Choose the language that suits you":language?.id==='fr'?"Choisissez la langue qui vous convient":"إختر اللغة التي تناسبك"}

    >
       <View>
        {
            languageData.map((item)=>(
                <TouchableOpacity
                onPress={()=>seleteLanguage(item)}
                activeOpacity={0.8} 
                key={item.id} 
                className='py-4  flex flex-row items-center justify-between border-b border-neutral-100'>
                 <View className='flex flex-row items-center space-x-6'>
                 <Image source={item.image} className='w-8 h-8'/>
                 <Text className='text-left font-kufi-medium text-base' >{item.name}</Text>
                 </View>
                 <FontAwesome name='check-circle' size={24} color={language?.id===item.id?"#059669":"#A3A3A3"} />
                </TouchableOpacity>
            ))
        }
       </View>
    </Drawer>
  )
}

export default LanguageDrawer