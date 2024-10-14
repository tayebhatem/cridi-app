import { View, Text, Image } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';
const Hero = () => {
  return (
    <View>
     <LinearGradient
        
        colors={['#059669', '#03a875','#04c489']}
        className='p-4 flex flex-row rounded-md shadow-primary-500 shadow-md overflow-hidden flex-wrap'
       >
         <View>
     <Text className='text-2xl font-medium text-white'>
        Track your debts with Cridi
      </Text>
      <Text className='text-white'>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Possimus architecto odio, molestiae reiciendis adipisci dolores sapiente! Sequi dolore quis.
      </Text>
     </View>
     <Image source={require('../../assets/images/onboarding.png')} resizeMode='contain' className='w-28 h-28'/>
      </LinearGradient>
    </View>
  )
}

export default Hero