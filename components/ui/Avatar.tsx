import { View, Text, Image } from 'react-native'
import React from 'react'

const Avatar = ({size,url}:{size:'Small'|'Medium'|'Large',url:string | undefined}) => {
  return (
    <View className={`bg-white rounded-full overflow-hidden  flex items-center justify-center border border-neutral-200 dark:border-dark-400 ${size==='Small'?'w-12 h-12':size==='Medium'?'w-16 h-16':'w-20 h-20'}`}>
    <Image src={url} resizeMode='center' className='w-full h-full'/>
  </View>
  )
}

export default Avatar