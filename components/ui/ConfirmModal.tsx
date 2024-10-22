import { View, Text, Modal, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { BlurView } from 'expo-blur';
import useLanguageStore from '@/stores/useLanguageStore';
const ConfirmModal = (
  { 
    title,
    description,
    open,
    setOpen,
    onChange}
    :{title:string,
      description:string,
      open:boolean,
      setOpen:(open:boolean)=>void,
      onChange:()=>Promise<void>
    }) => {
    const [isLoading, setIsLoading] = useState(false)
    const {language}=useLanguageStore()
      const onConfirm=async()=>{
        setIsLoading(true)
           try {
            await onChange()
           } catch (error) {
            
           }finally{
            setIsLoading(false)
           }
      }
  return (
 
     <Modal 
     
   transparent
   animationType='slide'
   statusBarTranslucent
   
   visible={open} 
   onRequestClose={()=>setOpen(!open)}
   >
   <BlurView 
  intensity={100} tint="dark" blurReductionFactor={1}
   className='flex items-center justify-center w-full h-full'
   >
   
    <View className='bg-white p-4 rounded-md space-y-3 w-3/4'>
<Text className='text-lg font-kufi-medium text-center '>{title}</Text>
<Text className='text-neutral-400 font-kufi text-center leading-5'>
{description}
</Text>
<View className='flex flex-row items-center justify-end gap-x-2 '>
<TouchableOpacity 
disabled={isLoading}
onPress={()=>setOpen(false)}
activeOpacity={0.8} 
className={`flex-1 bg-neutral-100 rounded-md shadow-neutral-50 shadow-md p-3 ${isLoading && 'opacity-50'}`}>
    <Text className='text-black text-center font-kufi-medium'>{language?.id==='en'?"Cancel":language?.id==='fr'?"Annuler":"إلغاء"}</Text>
  </TouchableOpacity>
  <TouchableOpacity 
  disabled={isLoading}
  onPress={onConfirm}
  activeOpacity={0.8} 
  className={`flex-1 bg-red-500 rounded-md shadow-red-500 shadow-md p-3 ${isLoading && 'opacity-50'}`}>
  <Text className='text-white text-center font-kufi-medium'>{language?.id==='en'?"Confirm":language?.id==='fr'?"Confirmer":"تأكيد"}</Text>
  </TouchableOpacity>
</View>
</View>
    
   </BlurView>

   </Modal>

  )
}

export default ConfirmModal