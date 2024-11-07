import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import useLanguageStore from '@/stores/useLanguageStore'
import LanguageDrawer from './LanguageDrawer'

const LanguageButton = () => {
    const {language}=useLanguageStore()
    const [openLanguage, setOpenLanguage] = useState(false)
  return (
 <>
    <TouchableOpacity 
    onPress={()=>setOpenLanguage(true)}
    activeOpacity={0.8}
    className='rounded-full w-8 h-8 overflow-hidden flex items-center justify-center border-2 border-neutral-100 self-end'>
      <Image source={language?.image}  resizeMode='contain'  />
    </TouchableOpacity>

    <LanguageDrawer open={openLanguage} setOpen={setOpenLanguage}/>
 </>
  )
}

export default LanguageButton