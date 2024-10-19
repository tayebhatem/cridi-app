import { View, Text, Image } from 'react-native'
import React from 'react'
import useAccountStore from '@/stores/useAccountStore'
import Avatar from '../ui/Avatar'
import useLanguageStore from '@/stores/useLanguageStore'

const Header = () => {
    const {account}=useAccountStore()
    const{language}=useLanguageStore()
  return (
    <View className='flex flex-row justify-between items-center'>
    <Image source={require('../../assets/images/logo.png')} resizeMode='contain' className='w-16 h-16'/>
    <View className='flex flex-row space-x-2 '>
    <View className='text-left'>
    <Text className='text-sm text-neutral-400 font-kufi leading-6'>{
      language?.id==='en'?"Welcome back":language?.id==='fr'?"Bon retour":"مرحباً بعودتك"
      }
      👋
      </Text>
    <Text className='text-lg text-black dark:text-white  font-kufi-semi-bold capitalize'>{account?.name}</Text>
    </View>
    <Avatar size='Small' url={account?.avatar}/>
    </View>
   </View>
  )
}

export default Header