import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState, useTransition } from 'react'

const Button = ({title,onChange}:{title:string,onChange:()=>Promise<void>}) => {

   const [isLoading, setisLoading] = useState(false)
  
  const onSubmit=async()=>{
    setisLoading(true)
     try {
      await onChange()
     } catch (error) {
      
     }finally{
      setisLoading(false)
     }
  }
  return (
    <TouchableOpacity 
    onPress={onSubmit}
    activeOpacity={0.9} 
    className={`bg-primary-500 w-full my-4 rounded-full shadow-primary-500 shadow-md p-3 flex flex-row justify-center items-center ${isLoading && 'opacity-70'}`} 
    disabled={isLoading}>
   <Text className='text-white capitalize text-lg font-medium'>
{
    !isLoading ? title:<ActivityIndicator size={'large'} color={"#FFF"}/>
}
   </Text>
    </TouchableOpacity>
  )
}

export default Button