
import { Link, useRouter } from 'expo-router'
import { Text, TextInput, Button, View } from 'react-native'
import React from 'react'

const SignInScreen = () => {
 
    const router = useRouter()
  
    const [emailAddress, setEmailAddress] = React.useState('')
    const [password, setPassword] = React.useState('')
  
   
  
    return (
      <View>
      <Text>Sign in </Text>
      </View>
    )
}

export default SignInScreen