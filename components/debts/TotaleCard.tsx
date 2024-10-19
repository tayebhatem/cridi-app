import { View, Text } from 'react-native'
import React from 'react'

const TotaleCard = ({total,subText}:{total:number | undefined,subText:string}) => {
    
  return (
    <View className='bg-pink-200 shadow-pink-200 shadow-md p-2 rounded-md space-y-2 '>
      <Text className='text-2xl text-pink-800 font-medium'>{total}.00 DA</Text>
      <Text className='text-pink-800 text-left font-kufi'>
      {subText}
      </Text>
    </View>
  )
}

export default TotaleCard