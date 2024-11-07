import { View, Text } from 'react-native'
import React from 'react'
import { Image } from 'react-native'

const Logo = () => {
  return (
    <View className='w-full items-center flex flex-row space-y-2 justify-center'>
            <Image source={require('../../assets/images/logo.png')} resizeMode='contain' className='w-12 h-12 ' />
            <Text className='text-2xl font-kufi-bold leading-9'>Cridi</Text>
          </View>
  )
}

export default Logo