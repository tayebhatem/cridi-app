import { View, Text, TouchableOpacity, ScrollView, Pressable, FlatList } from 'react-native'
import React, { useState } from 'react'
import { itemType } from '@/types'
import Drawer from './Drawer'
import useLanguageStore from '@/stores/useLanguageStore'
import { FontAwesome, MaterialIcons } from '@expo/vector-icons'
import SearchInput from './SearchInput'
import BottomSheet from './BottomSheet'

const Dropdown = ({
    onChange,
    list,
    selectedItem,
    title,
    description
}:{
    onChange:(selectedItem:itemType)=>void,
    list:itemType[],
    selectedItem:itemType | undefined,
    title:string,
    description:string
   }) => {
    const {language}=useLanguageStore()
    const [open, setOpen] = useState(false)
    const [filterData, setfilterData] = useState<itemType[] >(list)
    const handleSearch = (text: string) => {
      if(text===''){
        setfilterData(list)
      }else{
       let filterData =list

       if(language?.id==='ar'){
        filterData= list.filter((item) => 
          item.name.ar.toLocaleLowerCase().includes(text.toLocaleLowerCase()) || item.id.toString().includes(text)
         );
       }else if(language?.id==='fr'){
        filterData= list.filter((item) => 
          item.name.fr.toLocaleLowerCase().includes(text.toLocaleLowerCase()) || item.id.toString().includes(text)
         );
       }else{
        filterData=  list.filter((item) => 
          item.name.en.toLocaleLowerCase().includes(text.toLocaleLowerCase()) || item.id.toString().includes(text)
         );
       }
       
       setfilterData(filterData);
      } 
     }
     const DropdownItem=({item}:{item:itemType})=>(
      <TouchableOpacity
                onPress={()=>{
                  onChange(item)
                setOpen(false)
                }}
                activeOpacity={0.8} 
                key={item.id} 
                className='py-4  flex flex-row items-center justify-between border-b border-neutral-100  dark:border-dark-300'>
                 <View className='flex flex-row items-center space-x-6'>
                 <Text className='text-left font-kufi-medium text-base text-black dark:text-white' >
                  {
                 item.id+' - '+( language?.id==='ar'?item.name.ar:language?.id==='fr'?item.name.fr:item.name.en)
                  }
                  </Text>
                 </View>
                 <FontAwesome name='check-circle' size={24} color={selectedItem?.id===item.id?"#059669":"#A3A3A3"} />
                </TouchableOpacity>
     )
  return (
   <>
    <View className='space-y-2'>
    <Text className={`text-base font-kufi-medium leading-9 text-black dark:text-white`}>{title}</Text>
   <View className={`w-full flex flex-row items-center   bg-neutral-100 dark:bg-dark-300 border  rounded-md p-3 focus:border-primary-500 border-neutral-200 dark:border-dark-200`}>
  
 <Pressable onPress={()=>setOpen(true)} className='flex flex-row items-center flex-1 justify-between'>
 <Text  className='flex-1 text-black dark:text-white font-kufi text-left'>
                 {
                 selectedItem?.id+' - '+(  language?.id==='ar'?selectedItem?.name.ar:language?.id==='fr'?selectedItem?.name.fr:selectedItem?.name.en)
                  }
   </Text>
   <MaterialIcons name="keyboard-arrow-down" size={24} color="#A3A3A3" />
 </Pressable>
   </View>
    
  </View>
    <BottomSheet 
    open={open}
    setOpen={setOpen}
    title={title} 
    description={description}

    >
     <View className='my-2'>
   <SearchInput onChange={handleSearch}/>
   </View>
  <FlatList 
  data={filterData}
  keyExtractor={(item)=>item.id.toString()}
  renderItem={(item)=><DropdownItem item={item.item}
  />}
  showsVerticalScrollIndicator={false}
  showsHorizontalScrollIndicator={false}
  className='h-[70%]'

  />
    </BottomSheet>
   </>
  )
}

export default Dropdown