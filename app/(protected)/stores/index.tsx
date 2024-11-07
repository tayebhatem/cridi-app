import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import PageLayout from '@/components/ui/PageLayout'
import PageHeader from '@/components/ui/PageHeader'
import useLanguageStore from '@/stores/useLanguageStore'
import useAccountStore from '@/stores/useAccountStore'
import {  StoreType } from '@/types'
import { getStores } from '@/actions/store'
import StoreItem from '@/components/store/StoreItem'
import SearchInput from '@/components/ui/SearchInput'

const StoresScreen = () => {
  const {language}=useLanguageStore()
  const [stors, setStors] = useState<StoreType[]>([])
  const [data, setData] = useState<StoreType[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const {account}=useAccountStore()
  useEffect(() => {
   const fetchStors=async()=>{
       if(account){
          try {
              const data=await getStores()
               if(!data) return
              setStors(data)
              setData(data)
           } catch (error) {
              
           }finally{
            setIsLoading(false)
           }
       }
   }

   fetchStors()
  }, [account])
  const handleSearch = (text: string) => {
   if(text===''){
setStors(data)
   }else{
    const filterData = data.filter((item) => 
      item.name.toLocaleLowerCase().includes(text.toLocaleLowerCase())
    );
    setStors(filterData);
   } // Update filtered data
  }
  
  return (
 <PageLayout>
  <PageHeader title={language?.id==='en'?"Stores":language?.id==='fr'?"Magazines":"محلات"}/>
  <View>
   <SearchInput 
   onChange={handleSearch}/>
  </View>
  <View>
{isLoading?<View className='w-full h-full justify-center items-center'>
  <ActivityIndicator size={'large'} color={'#059669'}/>
</View>:
    <FlatList
    showsHorizontalScrollIndicator={false}
    showsVerticalScrollIndicator={false}
    numColumns={2}
    className=''
    contentContainerStyle={{rowGap:10}}
    columnWrapperStyle={{gap:10}}
    data={stors}
    keyExtractor={item=>item.id}
    renderItem={(item)=>
    <View className={stors.length>1 ?'flex-1':'w-1/2'}>
     <StoreItem store={item.item}/>
    </View>}
    />
}
  </View>
 </PageLayout>
  )
}

export default StoresScreen