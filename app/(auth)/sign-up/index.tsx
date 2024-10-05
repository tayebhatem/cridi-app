import * as React from 'react'
import { TextInput, Button, View, Text } from 'react-native'
import { useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

const SignUpScreen = () => {
   
    const router = useRouter()
  
    const [emailAddress, setEmailAddress] = React.useState('')
    const [password, setPassword] = React.useState('')
   
    return (
     <SafeAreaView>
         <View>
     <Text>Sign up</Text>
      </View>
     </SafeAreaView>
    )
}

export default SignUpScreen