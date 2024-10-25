import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import PageLayout from '@/components/ui/PageLayout'
import PageHeader from '@/components/ui/PageHeader'
import useLanguageStore from '@/stores/useLanguageStore'
import useAccountStore from '@/stores/useAccountStore'
import { AccountUserType, StoreType } from '@/types'
import { getStores } from '@/actions/store'
import StoreItem from '@/components/store/StoreItem'
import SearchInput from '@/components/ui/SearchInput'

const StoresScreen = () => {
  const {language}=useLanguageStore()
  const [stors, setStors] = useState<StoreType[]>([])
  const [data, setData] = useState<StoreType[]>([])
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
   onChange={handleSearch} 
   placeholder={language?.id==='en'?"Search a store...":language?.id==='fr'?"Rechercher un magasin...":"إبحث عن محل..."}/>
  </View>
  <View>
  <FlatList
   showsHorizontalScrollIndicator={false}
   showsVerticalScrollIndicator={false}
   numColumns={2}
   className=''
   contentContainerStyle={{gap:20,alignItems:stors?.length>1 ?'center':'baseline'}}
   columnWrapperStyle={{gap:20}}
   data={stors}
   keyExtractor={item=>item.id}
   renderItem={(item)=><StoreItem store={item.item}/>}
   />
  </View>
 </PageLayout>
  )
}

export default StoresScreen