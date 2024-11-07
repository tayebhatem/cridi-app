import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome5, MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Button from "@/components/ui/Button";
import useLanguageStore from "@/stores/useLanguageStore";
import { updateAccountType } from "@/libs/appwrite";
import useAccountStore from "@/stores/useAccountStore";
import Logo from "@/components/ui/Logo";

const UserTypeScreen = () => {
  const [category, setCategory] = useState<'CLIENT' | 'SUPPLIER'>('CLIENT');
  const router = useRouter();
  const { language } = useLanguageStore();
const {account,setAccount}=useAccountStore()
  const submit = async () => {
    try {
    
     if(account){
       const updatedAccount= await updateAccountType(category,account.id)
      if(updatedAccount){
        setAccount(updatedAccount)
        if(updatedAccount.type==='SUPPLIER'){
          router.push('/supplier');
        }
        if(updatedAccount.type==='CLIENT'){
          router.push('/dashboard');
        }
      }
     }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView className="bg-white h-full w-full px-6 justify-center">
   
      <Text  className="text-2xl font-kufi-semi-bold">
        {language?.id === 'en' ? 'Choose Account Category' : language?.id === 'fr' ? 'Choisissez la catégorie de compte' : 'اختر فئة الحساب'}
      </Text>

      <Text className="text-neutral-400 font-kufi leading-6">
        {language?.id === 'en' 
          ? 'Please select the appropriate account category to continue.' 
          : language?.id === 'fr' 
          ? 'Veuillez sélectionner la catégorie de compte appropriée pour continuer.' 
          : 'يرجى اختيار الفئة المناسبة للحساب للمتابعة.'
        }
      </Text>

      <View className="flex-row space-x-3 my-3">
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => setCategory('SUPPLIER')}
          className={`relative flex-1 border rounded-md p-3 items-center justify-center space-y-4 ${
            category === 'SUPPLIER' ? "border-primary-500 border-2" : "border-neutral-200"
          }`}
        >
          {category === 'SUPPLIER' && (
            <View className="absolute -top-3 -right-2 bg-white">
              <FontAwesome name="check-circle" size={24} color="#059669" />
            </View>
          )}

          <View className="bg-purple-100 items-center justify-center rounded-full w-20 h-20">
            <MaterialIcons name="local-shipping" size={40} color="#a855f7" />
          </View>

          <View>
            <Text className="text-2xl font-kufi-medium text-center">
              {language?.id === 'en' ? 'Supplier' : language?.id === 'fr' ? 'Fournisseur' : 'مورد'}
            </Text>
            <Text className="text-neutral-400 font-kufi text-center text-sm">
              {language?.id === 'en' ? 'I represent a business and offer supplies to stores.' : language?.id === 'fr' ? 'Je représente une entreprise et je fournis des magasins.' : 'أمثل شركة وأوفر إمدادات للمتاجر.'}
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => setCategory('CLIENT')}
          className={`relative flex-1 border rounded-md p-3 items-center justify-center space-y-4 ${
            category === 'CLIENT' ? "border-primary-500 border-2" : "border-neutral-200"
          }`}
        >
          {category === 'CLIENT' && (
            <View className="absolute -top-3 -right-2 bg-white">
              <FontAwesome name="check-circle" size={24} color="#059669" />
            </View>
          )}

          <View className="bg-green-100 items-center justify-center rounded-full w-20 h-20">
            <FontAwesome5 name="user-tie" size={40} color="#22c55e" />
          </View>

          <View>
            <Text className="text-2xl font-kufi-medium text-center">
              {language?.id === 'en' ? 'Customer' : language?.id === 'fr' ? 'Client' : 'زبون'}
            </Text>
            <Text className="text-neutral-400 font-kufi text-center text-sm">
              {language?.id === 'en' ? 'I am looking for products and services from stores.' : language?.id === 'fr' ? 'Je recherche des produits et des services dans les magasins.' : 'أبحث عن منتجات وخدمات من المتاجر.'}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

    <View>
    <Button title={language?.id === 'en' ? 'Save' : language?.id === 'fr' ? 'Enregistrer' : 'حفظ'} onChange={submit} />
    </View>
    </SafeAreaView>
  );
};

export default UserTypeScreen;
