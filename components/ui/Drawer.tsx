import { View, Text, Modal, TouchableOpacity } from 'react-native'
import React, { ReactNode } from 'react'
import { BlurView } from "@react-native-community/blur";
import { Entypo } from '@expo/vector-icons';
const Drawer = ({children,title,description,open,setOpen}:{children:ReactNode,title:string,description:string,open:boolean,setOpen:(open:boolean)=>void}) => {
  return (
  <>
 {open && 
 <BlurView blurType='material' blurAmount={1} style={{height:'100%'}}>

 
    <Modal 

   transparent
   animationType='slide'
   visible={open} 
   onRequestClose={()=>setOpen(!open)}
   
   >
 <View className='h-full w-full flex justify-end'>
 <View className='bg-white dark:bg-dark-400 p-4 rounded-md space-y-3 h-2/5 w-full rounded-t-xl '>
       <View className='flex flex-row items-center justify-between'>
       <Text className='text-base font-kufi-medium text-black dark:text-white'>{title}</Text>
    <TouchableOpacity activeOpacity={0.8} onPress={()=>setOpen(false)}>
    <Entypo  name='cross' color={"#A3A3A3"} size={28}/>
    </TouchableOpacity>
       </View>
       <Text className='text-neutral-400 font-kufi'>{description}</Text>

       <View>
        {children}
       </View>
        </View>
 </View>
 
      
  
   </Modal>
   </BlurView>}
  </>
  )
}

export default Drawer