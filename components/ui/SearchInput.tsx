import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Entypo, Feather } from '@expo/vector-icons'
import useLanguageStore from '@/stores/useLanguageStore'

const SearchInput = ({onChange}:{onChange:(text:string)=>void}) => {
    
const {language}=useLanguageStore()

    
  return (
    <View>
      
    <View className='p-2 flex flex-row space-x-2 items-center  bg-neutral-200/50 rounded-md border border-neutral-200' >
    <Feather name="search" size={24} color="#A3A3A3" />
    <TextInput 
    placeholder={language?.id==='en'?"Search...":language?.id==='fr'?"Recherche...":"إبحث..."} 
    className='flex-1 font-kufi text-black dark:text-white' 
    onChangeText={onChange}/>
   
    </View>
    </View>
  )
}

export default SearchInput