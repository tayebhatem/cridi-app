import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import StoreNavigations from './StoreNavigations'
import useDebtsStore from '@/stores/useDebtsStore'
import { getTotalDebts } from '@/actions/debts'
import useLanguageStore from '@/stores/useLanguageStore'
import CardLayout from '../ui/CardLayout'
import TotaleCard from '../debts/TotaleCard'

const StoreHero = ({id}:{id:string}) => {
     const [totalDebts, setTotalDebts] = useState<number | undefined>()
     const{language}=useLanguageStore()
     useEffect(() => {
      const fetchTotalDebts=async()=>{
                  try {
                    const total=await getTotalDebts(id)
                    if(!total) return
                    setTotalDebts(total)

                  } catch (error) {
                    console.log(error)
                  }
      }
      fetchTotalDebts()
     }, [])
     
  return (
    <TotaleCard total={totalDebts} subText={language?.id==='en'?"Total debts":language?.id==='fr'?"Crédits totales":"إجمالي الديون"}/>
  )
}

export default StoreHero