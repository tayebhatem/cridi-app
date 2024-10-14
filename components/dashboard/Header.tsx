import { View, Text, Image } from 'react-native'
import React from 'react'
import useAccountStore from '@/stores/useAccountStore'
import Avatar from '../ui/Avatar'

const Header = () => {
    const {account}=useAccountStore()
  return (
    <View className='flex flex-row justify-between items-center'>
    <Image source={require('../../assets/images/logo.png')} resizeMode='contain' className='w-16 h-16'/>
    <View className='flex flex-row gap-x-2 '>
    <View className='text-left'>
    <Text className='text-sm text-[#aaa]'>Welcome back</Text>
    <Text className='text-lg font-medium capitalize'>{account?.name}</Text>
    </View>
    <Avatar size='Small' url={account?.avatar}/>
    </View>
   </View>
  )
}

export default Header