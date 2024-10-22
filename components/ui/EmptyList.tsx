import { View, Text, Image } from 'react-native'
import React from 'react'

const EmptyList = ({title,subText}:{title:string,subText:string}) => {
  return (
    <View className='w-full h-full flex items-center justify-center space-y-2'>
     <Image source={require('../../assets/images/empty.png')} resizeMode='center' className='w-40 h-40'/>
     <View>
     <Text className='text-xl text-center font-kufi-medium'>{title}</Text>
     <Text className='font-kufi text-center text-neutral-400 leading-6'>{subText}</Text>
     </View>
    </View>
  )
}

export default EmptyList