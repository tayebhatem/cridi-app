import React, { useRef, useState } from 'react'
import { View, TextInput, StyleSheet, Text } from 'react-native'

const OtpInput = ({onChange,error}:{onChange:(text:string)=>void,error:string}) => {
  const [otp, setOtp] = useState(['', '', '', ''])
  const inputRefs = useRef<Array<TextInput | null>>([])

  const handleChange = (text: string, index: number) => {
    const newOtp = [...otp]
    newOtp[index] = text
    setOtp(newOtp)
    let newText=''
    newOtp.map((text)=>{
        newText=text+newText
    })

    onChange(newText.split('').reverse().join(''))
    // Automatically focus next input if current one is filled
    if (text && index < 3) {
      inputRefs.current[index + 1]?.focus()
    }
   
    // Backspace to focus the previous input
    if (!text && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
    
  }

  return (
   <View className='space-y-2'>
     <View className='flex flex-row w-full space-x-3'>
      {otp.map((digit, index) => (
        <TextInput
          key={index}
          ref={(ref) => (inputRefs.current[index] = ref)}
        className={`border border-neutral-300 rounded-md text-lg font-medium flex-1 p-4 text-center focus:border-primary-500 ${error && 'border-red-500'} `}
          keyboardType="numeric"
          maxLength={1}
          value={digit}
          onChangeText={(text) => handleChange(text, index)}
        />
      ))}
    </View>
    
   </View>
  )
}



export default OtpInput
