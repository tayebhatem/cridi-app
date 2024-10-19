import { View, Text, FlatList, RefreshControl, TouchableOpacity } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { getDebsts } from '@/actions/debts'
import { DebtsType } from '@/types'
import { Ionicons } from '@expo/vector-icons'
import DebtItem from './DebtItem'
import useLanguageStore from '@/stores/useLanguageStore'
import CardLayout from '../ui/CardLayout'




const DebtsCard = ({debts}:{debts:DebtsType[]}) => {
 
    
   
  return (
   <></>
  )
}

export default DebtsCard