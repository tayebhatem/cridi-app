
import React from 'react'
import {  Tabs } from 'expo-router'
import TabIcon from '@/components/ui/TabIcon'

const DashboardLayout = () => {

  return (

<Tabs

screenOptions={{
  
  headerShown: false,
  tabBarActiveTintColor:"#059669",
  tabBarInactiveTintColor:"#A5A29D",
  tabBarShowLabel:false,
  tabBarStyle:{
    height:75,
    backgroundColor:'#FFF',
    borderColor:'#FFF'

  },
  
  
}}
>
    <Tabs.Screen name='index' options={{headerShown:false,tabBarIcon:({ color, focused })=>(
      <TabIcon 
      color={color}
      focused={focused}
      icon={'home'}
      name='Home'
      notification={0}

      />
    )}} />
    <Tabs.Screen name='messages/index' options={{tabBarIcon:({ color, focused })=>(
      <TabIcon 
      color={color}
      focused={focused}
      icon={'message1'}
      name='Messages'
      notification={0}

      />
    )}} 
    />
    <Tabs.Screen name='notifications/index'
     options={{tabBarIcon:({ color, focused })=>(
      <TabIcon 
      color={color}
      focused={focused}
      icon={'bells'}
      name='Notification'
      notification={0}
      
      />
    )}}
    />
    <Tabs.Screen name='settings/index'
     options={{tabBarIcon:({ color, focused })=>(
      <TabIcon 
      color={color}
      focused={focused}
      icon={'setting'}
      name='Settings'
      notification={0}
      
      />
    )}}
    />
</Tabs>

  )
}

export default DashboardLayout