import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import useLanguageStore from '@/stores/useLanguageStore';
import Carousel from 'react-native-reanimated-carousel';
import { Dimensions } from 'react-native';
import { publicationType } from '@/types';
import { getPublications } from '@/libs/appwrite';


const Hero = () => {
  const {language}=useLanguageStore()
  const width = Dimensions.get('window').width;
  const [publications, setpublications] = useState<publicationType[]>([])
  useEffect(() => {
     const fetchPubs=async()=>{
      try {
        const data=await getPublications()
        setpublications(data)
      } catch (error) {
        console.log(error)
      }
     }
     fetchPubs()
  }, [])
  useEffect(() => {
    const subscribe=()=>{

    }
  }, [])
  
  return (
    <View className=''>
        <Carousel
          
                loop
                width={width}
                height={width / 2}
                autoPlay={true}
                autoPlayReverse
                mode='parallax'
                data={publications}
                scrollAnimationDuration={4000}
                onSnapToItem={(index) => {}}
                renderItem={(item) => (
                  <View
                  className={`flex h-52 flex-row rounded-md shadow-primary-500 shadow-md overflow-hidden ${item.index===0?'bg-primary-500':'bg-blue-500'} `}
                 >
                  
                   <View className={`flex-1 p-3`}>
               <Text className='text-xl text-center font-kufi-semi-bold text-white' numberOfLines={3}>
                {item.item.title}
                </Text>
                <Text className='text-white text-center py-2 font-kufi  leading-5' numberOfLines={4}>
                {item.item.description}
                </Text>
               </View>
             
               <View className={`px-2   relative flex items-center justify-end`}>
               <Image src={item.item.image} resizeMode='cover' className='w-40 h-40 self-center'/>
               </View>
            
                </View>
                )}
            />
    <View>
      
    </View>
    </View>
  )
}

export default Hero