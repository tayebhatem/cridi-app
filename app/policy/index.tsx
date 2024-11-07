import { View, Text } from 'react-native'
import React from 'react'
import { WebView } from 'react-native-webview';
import Constants from 'expo-constants';
import { StyleSheet } from 'react-native';
const policyPage = () => {
  return (
    <WebView
      style={styles.container}
      source={{ uri: 'https://www.cridi.online/policy' }}
    />
  )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
     
    },
  });
export default policyPage