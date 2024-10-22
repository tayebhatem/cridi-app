import { View, Text } from 'react-native'
import React, { ReactNode } from 'react'

const ThemeProvider = ({children}:{children:ReactNode}) => {
    
  return (
    <>
    {children}
    </>
  )
}

export default ThemeProvider