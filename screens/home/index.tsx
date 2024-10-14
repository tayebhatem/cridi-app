import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const HomeScreen = () => {
  return (
    <SafeAreaView>
     <View>
      <Text className='text-lg font-bold bg-red-500 text-center p-3'>OnboardingScreen</Text>
      <Text className='bg-black'>test</Text>
    </View>
   </SafeAreaView>
  )
}

export default HomeScreen