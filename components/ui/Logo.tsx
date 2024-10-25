import { View, Text } from 'react-native'
import React from 'react'
import { Image } from 'react-native'

const Logo = () => {
  return (
    <View className='w-full items-center'>
            <Image source={require('../../assets/images/logo.png')} resizeMode='contain' className='w-24 h-24 ' />
          </View>
  )
}

export default Logo