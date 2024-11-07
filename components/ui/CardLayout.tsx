import { View, Text } from 'react-native'
import React, { ReactNode } from 'react'
import { Card } from 'tamagui'

const CardLayout = ({children}:{children:ReactNode}) => {
  return (
    <View >
      <Card className='p-4 bg-white'>
      {children}
      </Card>
      
    </View>
  )
}

export default CardLayout