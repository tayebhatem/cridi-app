import { View, Text } from 'react-native'
import React from 'react'
import { AntDesign, FontAwesome } from '@expo/vector-icons'
import { useSelector } from 'react-redux'


const TabIcon = ({ icon, color,focused, name,notification }:{icon:any,color:string,focused:boolean,name:string,notification:number | undefined}) => {
 
  return (
    <View className="flex items-center justify-center gap-y-1.5 my-2">
   <View>
   {notification!==undefined && notification>0 && 
       <View className='absolute -top-2 -right-2 w-6 h-6 text-sm justify-center items-center bg-red-500 z-50 rounded-full'>
<Text className=' text-sm   text-center  text-white font-medium'>{notification}</Text>
       </View>
       }
    <AntDesign
    name={icon}
    size={24}
    color={color}/>
   </View>
      <Text
       className={`text-sm  capitalize font-kufi-medium ${focused?'text-primary-500':'text-neutral-400'} `}
       
      >
        {name}
      </Text>
    </View>
  )
}

export default TabIcon