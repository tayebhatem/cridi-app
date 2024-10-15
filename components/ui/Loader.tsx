import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const Loader = () => {
  return (
   <SafeAreaView className='w-full h-full bg-white flex justify-center items-center'>
    <ActivityIndicator size={'large'} color={'#059669'}/>
   </SafeAreaView>
  )
}

export default Loader