import { View, Text } from 'react-native'
import React, { ReactNode } from 'react'

const CardLayout = ({children}:{children:ReactNode}) => {
  return (
    <View className='p-4 bg-white dark:bg-dark-400  rounded-md shadow-primary-500 shadow-md'>
      {children}
    </View>
  )
}

export default CardLayout