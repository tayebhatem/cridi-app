import { View, Text, Modal, TouchableOpacity } from 'react-native'
import React from 'react'
import { BlurView } from 'expo-blur';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
const Alert = ({title,type,description,open,onSave}:{title:string,open:boolean,type:'SUCCESS'|'WARNING',description:string,onSave:()=>void}) => {
  return (
    <Modal 
     
    transparent
    animationType='slide'
    visible={open} 
  
    >
    <BlurView 
  intensity={50} tint="dark"
   className='flex items-center justify-center w-full h-full'
   >
       <View className='bg-white p-4 rounded-md space-y-2 w-3/4 flex items-center'>

      {
        type==='SUCCESS'? <AntDesign name='checkcircleo' size={32} color={"#22c55e"}/>:
        <AntDesign name='warning' size={32} color={"#ef4444"}/>
      }

<Text className='text-lg font-medium  text-center'>{
    type==='SUCCESS'?'Success':'Error'
    }</Text>
<Text className='text-neutral-400 text-center'>
 {description}
</Text>
<TouchableOpacity 
  onPress={onSave}
  activeOpacity={0.8} 
  className={`w-full  rounded-md  shadow-md p-3 ${type==='SUCCESS'?'bg-primary-500 shadow-primary-500':'bg-red-500 shadow-red-500'}`}>
    <Text className='text-white text-center font-semibold'>{title}</Text>
  </TouchableOpacity>
</View>
   </BlurView>
   </Modal>
  )
}

export default Alert