import { View, Text,TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'


const TextArea = ({title,placeholder,value,error,onChange}:{title:string,placeholder:string,value:string | undefined,error:string,onChange:(text:string)=>void}) => {
  
    
  
  return (
    <View className='space-y-2'>
      <Text className={`text-base  font-kufi leading-9 text-black dark:text-white ${error && 'text-red-500'}`}>{title}</Text>
   
     <TextInput 
     style={{textAlignVertical:'top'}}
     numberOfLines={6}
     className={`w-full flex flex-row items-center  text-black dark:text-white font-kufi bg-neutral-100 dark:bg-dark-300 border  rounded-md p-3 focus:border-primary-500 border-gray-200 ${error && 'border-red-500'}`}
      placeholder={placeholder}
      defaultValue={value}
      onChangeText={(text)=>onChange(text)}
     />
  
   
      
    </View>
  )
}

export default TextArea