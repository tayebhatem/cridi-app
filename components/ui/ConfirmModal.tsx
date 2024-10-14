import { View, Text, Modal, TouchableOpacity } from 'react-native'
import React from 'react'
import { BlurView } from 'expo-blur';
const ConfirmModal = ({open,setOpen,onChange}:{open:boolean,setOpen:(open:boolean)=>void,onChange:()=>void}) => {
  return (
 
     <Modal 
     
   transparent
   animationType='slide'
   
   visible={open} 
   onRequestClose={()=>setOpen(!open)}
   >
   <BlurView 
  intensity={50} tint="dark"
   className='flex items-center justify-center w-full h-full'
   >
   
    <View className='bg-white p-4 rounded-md space-y-2 w-3/4'>
<Text className='text-lg font-medium '>Do you realy want to logout ?</Text>
<Text className='text-neutral-400'>
  Lorem ipsum dolor sit amet consectetur adipisicing elit.
</Text>
<View className='flex flex-row items-center justify-end gap-x-2 '>
<TouchableOpacity 
onPress={()=>setOpen(false)}
activeOpacity={0.8} 
className='flex-1 bg-neutral-100 rounded-md shadow-neutral-50 shadow-md p-3'>
    <Text className='text-black text-center font-semibold'>Cancel</Text>
  </TouchableOpacity>
  <TouchableOpacity 
  onPress={onChange}
  activeOpacity={0.8} 
  className='flex-1 bg-red-500 rounded-md shadow-red-500 shadow-md p-3'>
    <Text className='text-white text-center font-semibold'>Confirm</Text>
  </TouchableOpacity>
</View>
</View>
    
   </BlurView>

   </Modal>

  )
}

export default ConfirmModal