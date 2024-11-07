import { View, Text } from 'react-native'
import React from 'react'
import {AlertCircle} from '@tamagui/lucide-icons'
const ErrorMessage = ({error}:{error:string}) => {


  return (
  <View>
    {error?  <Text className='text-red-500  py-1.5 font-kufi leading-6 '>{error} <AlertCircle size={16} className='pt-1'  color={'#ef4444'}/></Text>:<></>}
  </View>
  )
}

export default ErrorMessage