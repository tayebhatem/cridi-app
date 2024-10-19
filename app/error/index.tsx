import { View, Text, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import useLanguageStore from '@/stores/useLanguageStore'
import { FontAwesome } from '@expo/vector-icons'
import Button from '@/components/ui/Button'
import { router } from 'expo-router'

const ErrorScreen = () => {
    const { language } = useLanguageStore()
  
    const getErrorContent = () => {
        switch (language?.id) {
            case 'en':
                return {
                    title: 'Network Error',
                    description: 'Something went wrong. Please try again later.',
                    buttonTitle: 'Try Again'
                }
            case 'fr':
                return {
                    title: 'Erreur Réseau',
                    description: 'Une erreur est survenue. Veuillez réessayer plus tard.',
                    buttonTitle: 'Réessayer'
                }
            case 'ar':
                return {
                    title: 'خطأ في الشبكة',
                    description: 'حدث خطأ ما. الرجاء المحاولة مرة أخرى لاحقًا.',
                    buttonTitle: 'حاول مرة أخرى'
                }
            default:
                return {
                    title: 'Network Error',
                    description: 'Something went wrong. Please try again later.',
                    buttonTitle: 'Try Again'
                }
        }
    }

    const { title, description, buttonTitle } = getErrorContent()

    return (
        <SafeAreaView className='bg-white dark:bg-dark-500 p-4 h-full flex items-center justify-center'>
            <Image source={require('../../assets/images/warning.png')} className='w-40 h-40' resizeMode='center' />
            <Text className='text-xl font-kufi-medium text-center text-primary'>{title}</Text>
            <Text className='text-center text-neutral-400 font-kufi leading-6'>{description}</Text>
            <Button onChange={async () => router.replace('/')} title={buttonTitle} />
        </SafeAreaView>
    )
}

export default ErrorScreen
