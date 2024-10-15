
import React from 'react'
import {  Tabs } from 'expo-router'
import TabIcon from '@/components/ui/TabIcon'
import useLanguageStore from '@/stores/useLanguageStore'

const DashboardLayout = () => {
  const {language}=useLanguageStore()
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
      name={language?.id==='en'?"Home":language?.id==='fr'?"Accueil":"الرئيسية"}
      notification={0}

      />
    )}} />
    <Tabs.Screen name='messages/index' options={{tabBarIcon:({ color, focused })=>(
      <TabIcon 
      color={color}
      focused={focused}
      icon={'message1'}
      name={language?.id==='en'?"Messages":language?.id==='fr'?"Messages":"الرسائل"}
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
      name={language?.id==='en'?"Notifications":language?.id==='fr'?"Notifications":"الإشعارات"}
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
      name={language?.id==='en'?"Settings":language?.id==='fr'?"Paramètres":"الإعدادات"}
      notification={0}
      
      />
    )}}
    />
</Tabs>

  )
}

export default DashboardLayout