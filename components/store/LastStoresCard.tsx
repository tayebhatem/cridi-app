import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link, router } from 'expo-router'
import useAccountStore from '@/stores/useAccountStore'
import { StoreType } from '@/types'
import { getAccountStores } from '@/actions/store'
import StoreItem from './StoreItem'
import useLanguageStore from '@/stores/useLanguageStore'
import CardLayout from '../ui/CardLayout'
import { Feather } from '@expo/vector-icons'

const LastStoresCard = () => {
  const { language } = useLanguageStore()
  const [stores, setStores] = useState<StoreType[] | undefined>([])
  const { account } = useAccountStore()

  useEffect(() => {
    const fetchStores = async () => {
      if (account) {
        try {
          const data = await getAccountStores(account.id, 3)
          setStores(data)
        } catch (error) {
          // Handle error if necessary
        }
      }
    }

    fetchStores()
  }, [account])

  return (
    <View>
      {stores && stores.length > 0 && (
        <View className="flex flex-row items-center justify-between">
          <Text className="text-lg text-black dark:text-white font-medium font-kufi-medium">
            {language?.id === 'en' ? 'Stores' : language?.id === 'fr' ? 'Magasins' : 'محلات'}
          </Text>
          <Link
            href="../../stores"
            className="text-primary-500 font-medium font-kufi-medium leading-6"
          >
            {language?.id === 'en'
              ? 'Read more'
              : language?.id === 'fr'
              ? 'En savoir plus'
              : 'إقرأ المزيد'}
          </Link>
        </View>
      )}

      <View className="my-4 flex justify-center items-center">
        <FlatList
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ gap: 10, width: '100%' }}
          horizontal
          data={stores}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <StoreItem store={item} />}
          ListEmptyComponent={() => (
            <View className="w-full">
              <CardLayout>
                <View className="flex justify-center items-center space-y-4 py-4">
                  <View>
                    <Text className="text-center text-base font-kufi-medium leading-7">
                      {language?.id === 'en'
                        ? 'You have no store linked to your account'
                        : language?.id === 'fr'
                        ? 'Aucun magasin lié à votre compte'
                        : 'ليس لديك أي متجر مرتبط بحسابك'}
                    </Text>
                    <Text className="text-neutral-400 font-kufi leading-6 text-center">
                    {language?.id === 'en'
              ? 'Find stores to link to your account'
              : language?.id === 'fr'
              ? 'Trouvez des magasins à lier à votre compte'
              : 'إبحث عن المتاجر لربطها بحسابك'}
                    </Text>
                  </View>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => router.push('/stores')}
                    className="bg-primary-500 shadow-primary-500 shadow-md rounded-md py-3 px-6 flex flex-row justify-center items-center space-x-2"
                  >
                    <Feather name="search" size={24} color="#FFF" />
                    <Text className="text-white font-kufi-medium text-base leading-8">
                      {language?.id === 'en'
                        ? 'Search'
                        : language?.id === 'fr'
                        ? 'Rechercher'
                        : 'بحث'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </CardLayout>
            </View>
          )}
        />
      </View>
    </View>
  )
}

export default LastStoresCard
