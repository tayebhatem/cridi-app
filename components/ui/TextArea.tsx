import { View, Text,TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'


const TextArea = ({title,placeholder,value,error,onChange}:{title:string,placeholder:string,value:string | undefined,error:string,onChange:(text:string)=>void}) => {
  
    
  
  return (
    <View className='space-y-2'>
      <Text className={`text-lg font-medium ${error && 'text-red-500'}`}>{title}</Text>
   
     <TextInput 
     style={{textAlignVertical:'top'}}
     numberOfLines={6}
     className={`w-full flex flex-row items-center   bg-gray-100 border rounded-md p-3 focus:border-primary-500 border-gray-200 ${error && 'border-red-500'}`}
      placeholder={placeholder}
      defaultValue={value}
      onChangeText={(text)=>onChange(text)}
     />
  
   
      
    </View>
  )
}

export default TextArea