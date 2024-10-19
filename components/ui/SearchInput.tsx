import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Entypo, Feather } from '@expo/vector-icons'

const SearchInput = ({onChange,placeholder}:{onChange:(text:string)=>void,placeholder:string}) => {
    


    
  return (
    <View>
      
    <View className='p-2 flex flex-row space-x-2 items-center  bg-neutral-200/50 rounded-md border border-neutral-200' >
    <Feather name="search" size={24} color="#A3A3A3" />
    <TextInput placeholder={placeholder} className='flex-1 font-kufi text-black dark:text-white' onChangeText={onChange}/>
   
    </View>
    </View>
  )
}

export default SearchInput