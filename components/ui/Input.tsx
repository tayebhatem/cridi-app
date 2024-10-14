import { View, Text,TextInput } from 'react-native'
import React, { useState } from 'react'
import { Ionicons, MaterialIcons,Entypo } from '@expo/vector-icons'

const Input = ({title,placeholder,type,value,error,onChange}:{title:string,placeholder:string,type:'text'|'email'|'password'|'number'|'phone',value:string | undefined,error:string,onChange:(text:string)=>void}) => {
  
    
  
  return (
    <View className='space-y-2'>
      <Text className={`text-lg font-medium ${error && 'text-red-500'}`}>{title}</Text>
     <View className={`w-full flex flex-row items-center   bg-gray-100 border rounded-md p-3 focus:border-primary-500 border-gray-200 ${error && 'border-red-500'}`}>
       <Entypo 
       name={
        type==='text'?'user'
        :type==='password'?'lock'
        :type==='phone'?'phone'
        :'email'}
       size={24} 
       className='text-gray-200 ' 
       color={'#CCC'}
       /> 
     <TextInput 
      className='w-full px-2'
      secureTextEntry={type==='password'} 
      placeholder={placeholder}
      defaultValue={value}
      onChangeText={(text)=>onChange(text)}
     />

     </View>
      
    </View>
  )
}

export default Input