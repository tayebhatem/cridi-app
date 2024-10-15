import { View, Text } from 'react-native'
import React, { ReactNode } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const PageLayout = ({children}:{children:ReactNode}) => {
  return (
   <SafeAreaView className='bg-neutral-100  space-y-4 h-full overflow-hidden p-4'>
{
    children
}
   </SafeAreaView>
  )
}

export default PageLayout