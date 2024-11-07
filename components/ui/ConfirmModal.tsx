import { View, Text, Modal, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { BlurView } from 'expo-blur';
import useLanguageStore from '@/stores/useLanguageStore';
import { AlertDialog, Button, XStack, YStack } from 'tamagui'
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
 
    <Modal transparent visible={open} statusBarTranslucent >
      <AlertDialog  open={open} onOpenChange={setOpen} >
    <AlertDialog.Portal>
      <AlertDialog.Overlay
        key="overlay"
        animation="quickest"
        opacity={0.5}
        enterStyle={{ opacity: 0 }}
        exitStyle={{ opacity: 0 }}
        
      />
      <AlertDialog.Content
        bordered
        elevate
        key="content"
        animation={[
          'quick',
          {
            opacity: {
              overshootClamping: true,
            },
          },
        ]}
        enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
        exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
        x={0}
        scale={1}
        opacity={1}
        y={0}
      >
        <YStack >
        <Text className='text-lg font-kufi-medium '>{title}</Text>
          <AlertDialog.Description className='text-neutral-400 font-kufi  leading-5 my-2'>
          {description}
          </AlertDialog.Description>

          <XStack gap="$3" justifyContent="flex-end">
            <AlertDialog.Cancel asChild >
              <Button>
              <Text className='text-black text-center font-kufi-medium'>{language?.id==='en'?"Cancel":language?.id==='fr'?"Annuler":"إلغاء"}</Text>
              </Button>
            </AlertDialog.Cancel>

            <Button onPress={onConfirm} className={`bg-red-500 ${isLoading && 'opacity-50'}`} disabled={isLoading}>
              <Text className='text-white text-center font-kufi-medium'>{language?.id==='en'?"Confirm":language?.id==='fr'?"Confirmer":"تأكيد"}</Text>
              </Button>
          </XStack>
        </YStack>
      </AlertDialog.Content>
    </AlertDialog.Portal>
  </AlertDialog>
    </Modal>


  )
}

export default ConfirmModal