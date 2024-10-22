import { View, Text,TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import {Feather } from '@expo/vector-icons'
import useLanguageStore from '@/stores/useLanguageStore'

const PhoneInput = ({value,onChange}:{value:string | undefined,onChange:(text:string)=>void}) => {
     const{language}=useLanguageStore()
    const handleInputChange = (text: string) => {
        const numericText = text.replace(/[^0-9]/g, '');  // Keep only digits
        onChange(numericText);
            
      };

  return (
    <View className='space-y-2'>
      <Text className={`text-base font-kufi-medium leading-9 text-black dark:text-white`}>{
        language?.id === 'en' ? 'Phone' : language?.id === 'fr' ? 'Téléphone' : 'الهاتف'
        }</Text>
     <View className={`w-full flex flex-row items-center   bg-neutral-100 dark:bg-dark-300 border  rounded-md p-3 focus:border-primary-500 border-neutral-200 dark:border-dark-200`}>
      <View className='flex flex-row items-center flex-1 space-x-2 '>
      <View className='w-8 border-r border-neutral-200'>
      <Image source={require('../../assets/images/ar.png')} resizeMode='cover' className='w-7 h-7'/>
     </View>

     <TextInput 
      className=' text-black dark:text-white   text-base flex-1 pt-1 '
      placeholder='0799667788'
      value={value}
      maxLength={10}
      
      keyboardType='number-pad'
      onChangeText={handleInputChange}
     />
   
      </View>
     </View>
      
    </View>
  )
}

export default PhoneInput