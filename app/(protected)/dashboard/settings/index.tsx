import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link, useRouter } from 'expo-router'
import { EvilIcons, FontAwesome, FontAwesome6, MaterialIcons } from '@expo/vector-icons'
import { deleteSession } from '@/libs/appwrite'
import ConfirmModal from '@/components/ui/ConfirmModal'
import PageHeader from '@/components/ui/PageHeader'
const accountData=[
  {
    id:1,
    name:'Account',
    link:'/account'
  },
  {
    id:1,
    name:'Password',
    link:'/password'
  },
  {
    id:1,
    name:'Language',
    link:'/language'
  },
]
const SettingsScreen = () => {
  const router=useRouter()
  const [open, setOpen] = useState(false)
  const logout=async()=>{
    try {
      const response=await deleteSession()
      if(response){
        router.replace('/auth/sign-in')
         setOpen(false)
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
 <SafeAreaView className='bg-neutral-100 h-full p-4 space-y-3'>

  <PageHeader title='Settings'/>

 <View className=' bg-white shadow-black shadow-md rounded-md p-4 space-y-4'>

  <TouchableOpacity 
  onPress={()=>router.push('../../account')}
  activeOpacity={0.8} 
  className='flex flex-row items-center pb-4  w-full border-b border-neutral-100'>
  <View className='flex flex-row items-center gap-x-3 w-full'>
  <FontAwesome name='user' color={'#aaa'} size={24}/>
  <Text className='text-[#aaa] text-base'>Account</Text>
   </View>
   <MaterialIcons name='arrow-forward-ios' color={'#aaa'} size={24} />
  </TouchableOpacity>

  <TouchableOpacity 
  onPress={()=>router.push('../../password')}
  activeOpacity={0.8} 
  className='flex flex-row items-center  justify-between w-full pb-4   border-b border-neutral-100'>
   <View className='flex flex-row items-center gap-x-3 w-full'>
   <FontAwesome name='lock' color={'#aaa'} size={24}/>
      <Text className='text-[#aaa] text-base'>Password</Text>
   </View>
   <MaterialIcons name='arrow-forward-ios' color={'#aaa'} size={24} />
  </TouchableOpacity>
  
  <TouchableOpacity activeOpacity={0.8} className='flex flex-row items-center  w-full pb-4  border-b border-neutral-100'>

  <View className='flex flex-row items-center gap-x-3 w-full'>
  <FontAwesome name='bell' color={'#aaa'} size={24}/>
   <Text className='text-[#aaa] text-base'>Notifications</Text>
   </View>
   <MaterialIcons name='arrow-forward-ios' color={'#aaa'} size={24} />
  </TouchableOpacity>

  <TouchableOpacity activeOpacity={0.8} className='flex flex-row items-center  w-full  '>
  <View className='flex flex-row items-center gap-x-3 w-full'>
  <FontAwesome name='globe' color={'#aaa'} size={24}/>
   
   <Text className='text-[#aaa] text-base'>Language</Text>
  </View>
   
  
  </TouchableOpacity>

 </View>

 <View className=' bg-white shadow-black shadow-md rounded-md p-4 space-y-4'>
  <View className='flex flex-row items-center gap-x-3 w-full'>
    <FontAwesome name='warning' color={'#aaa'} size={24}/>
    <TouchableOpacity>
      <Text className='text-[#aaa] text-base'>Report</Text>
    </TouchableOpacity>
  </View>

  <View className='flex flex-row items-center gap-x-3 w-full'>
    <FontAwesome name='question' color={'#aaa'} size={24}/>
    <TouchableOpacity>
      <Text className='text-[#aaa] text-base'>FAQ</Text>
    </TouchableOpacity>
  </View>

<View className='flex flex-row items-center gap-x-3 w-full '>
<FontAwesome name='sign-out' color={'#ef4444'} size={24}/>
<TouchableOpacity  activeOpacity={0.8} onPress={()=>setOpen(true)}>
   
    <Text className='text-red-500 text-base'>Logout</Text>
  </TouchableOpacity>
</View>

 </View>
 <ConfirmModal onChange={logout} open={open} setOpen={setOpen}/>
 </SafeAreaView>
  )
}

export default SettingsScreen