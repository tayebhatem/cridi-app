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
    className={`bg-primary-500 w-full  rounded-md shadow-primary-500 shadow-md p-4 flex flex-row justify-center items-center ${isLoading && 'opacity-70'}`} 
    disabled={isLoading}>
   <Text className='text-white capitalize text-lg font-kufi-semi-bold leading-8'>
{
    !isLoading ? title:<ActivityIndicator size={'large'} color={"#FFF"}/>
}
   </Text>
    </TouchableOpacity>
  )
}

export default Button