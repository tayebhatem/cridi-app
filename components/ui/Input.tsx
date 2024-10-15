import { View, Text,TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Ionicons, MaterialIcons,Entypo,Feather } from '@expo/vector-icons'

const Input = ({title,placeholder,type,value,error,onChange}:{title:string,placeholder:string,type:'text'|'email'|'password'|'number'|'phone',value:string | undefined,error:string,onChange:(text:string)=>void}) => {
  
    const [show, setShow] = useState(false);
  
  return (
    <View className='space-y-2'>
      <Text className={`text-lg font-medium ${error && 'text-red-500'}`}>{title}</Text>
     <View className={`w-full flex flex-row items-center   bg-gray-100 border rounded-md p-3 focus:border-primary-500 border-gray-200 ${error && 'border-red-500'}`}>
      <View className='flex flex-row items-center flex-1 '>
      <Feather 
       name={
        type==='text'?'user'
        :type==='password'?'lock'
        :type==='phone'?'phone'
        :'mail'}
       size={24} 
       className='text-gray-200 ' 
       color={'#A3A3A3'}
       /> 
     <TextInput 
      className='w-full px-2'
      secureTextEntry={!show && type==='password'} 
      placeholder={placeholder}
      defaultValue={value}
      onChangeText={(text)=>onChange(text)}
     />
      </View>
    {
      type==='password' && 
      <TouchableOpacity activeOpacity={0.8} onPress={()=>setShow(!show)}>
      {
        !show ?  <Feather name='eye' color={'#A3A3A3'} size={24}/>:
        <Feather name='eye-off' color={'#A3A3A3'} size={24}/>
      }
      </TouchableOpacity>
    }
     </View>
      
    </View>
  )
}

export default Input