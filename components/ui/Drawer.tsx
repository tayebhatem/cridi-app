import { View, Text, Modal, TouchableOpacity, StatusBar, Pressable } from 'react-native'
import React, { ReactNode } from 'react'
import { BlurView } from 'expo-blur';
import { Entypo } from '@expo/vector-icons';
import { X } from '@tamagui/lucide-icons'
const Drawer = ({children,title,description,open,setOpen}:{children:ReactNode,title:string,description:string,open:boolean,setOpen:(open:boolean)=>void}) => {
  return (
  <>
 


 
    <Modal 
   
   transparent
   animationType='slide'
   visible={open} 
   onRequestClose={()=>setOpen(!open)}
   
   >
 <StatusBar animated hidden/>
<BlurView className='absolute w-full h-full' tint='systemMaterialDark' intensity={100} blurReductionFactor={10} style={{height:'100%',position:'absolute'}}>
 <Pressable className='h-full w-full flex justify-end' onPress={()=>setOpen(false)}>
 <View className={`bg-white dark:bg-dark-400 p-4 rounded-md space-y-3  w-full rounded-t-xl`}>
       <View className='flex flex-row items-center justify-between'>
       <Text className='text-base font-kufi-medium text-black dark:text-white'>{title}</Text>
    <TouchableOpacity activeOpacity={0.8} onPress={()=>setOpen(false)}>
    <X size={28} color={"#A3A3A3"}/>
    </TouchableOpacity>
       </View>
       <Text className='text-neutral-400 font-kufi'>{description}</Text>

       <View>
        {children}
       </View>
        </View>
 </Pressable>
 
 </BlurView>
  
   </Modal>
  
  </>
  )
}

export default Drawer