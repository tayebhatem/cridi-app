import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import PageHeader from '@/components/ui/PageHeader'
import Avatar from '@/components/ui/Avatar'
import useAccountStore from '@/stores/useAccountStore'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { useRouter } from 'expo-router'
import { updateAccount, updateSupplier } from '@/libs/appwrite'
import Alert from '@/components/ui/Alert'
import useLanguageStore from '@/stores/useLanguageStore'
import { accountTranslation } from '@/constants/translation'
import ConfirmModal from '@/components/ui/ConfirmModal'
import { useChatContext } from 'stream-chat-expo'
import { Feather, MaterialIcons } from '@expo/vector-icons'
import PhoneInput from '@/components/ui/PhoneInput'
import { states, supplierFields } from '@/constants/supplier'
import { itemType, SupplierType } from '@/types'
import Dropdown from '../ui/Dropdown'
import TextArea from '../ui/TextArea'
import Loader from '../ui/Loader'
import ErrorMessage from '../ui/ErrorMessage'
import { useToast } from 'react-native-toast-notifications'


const translations = {
  stateTitle: {
    en: 'State',
    fr: 'Wilaya',
    ar: 'الولاية',
  },
  stateDescription: {
    en: 'Select the current state',
    fr: 'Sélectionnez la wilaya actuelle',
    ar: 'حدد الولاية الحالية .',
  },
  fieldTitle: {
    en: 'Field',
    fr: 'Domaine',
    ar: 'المجال',
  },
  fieldDescription: {
    en: 'Choose the supplier’s area of expertise or industry.',
    fr: 'Choisissez le domaine d\'expertise ou l\'industrie du fournisseur.',
    ar: 'اختر مجال الخبرة أو الصناعة للمورد.',
  },
  descriptionTitle: {
    en: 'Description',
    fr: 'Description',
    ar: 'الوصف',
  },
  descriptionPlaceholder: {
    en: 'Write description...',
    fr: 'Écrire une description...',
    ar: 'اكتب وصفا...',
  },

};

const SupplierAccount = () => {
    const {account,supplier,setSupplier,setAccount}=useAccountStore();
    const toast = useToast();
    const router=useRouter()
    const {client}=useChatContext()
     const [openSave, setopenSave] = useState(false)
     const [open, setopen] = useState(false)
  const [accountForm, setAccountForm] = useState({
    name: {
      value: account?.name || '',
      error: '',
    },
    phone: {
      value: account?.phone  || '',
      error: '',
    },
    description:supplier?.description,
    state:supplier?.state,
    field:supplier?.field,
  });

  const { language } = useLanguageStore();
  const accountTranslations=accountTranslation(language)

  const validateForm = () => {
    let valid = true;
    if (accountForm.name.value.trim().length ===0) {
      setAccountForm((prevState) => ({
        ...prevState,
        name: {
          ...prevState.name,
          error: accountTranslations.nameRequired,
        },
      }));
      valid = false;
    }

    return valid;
  };
  const handleDescriptionChange = (value: string) => {
    setAccountForm((prevState) => ({
      ...prevState,
      description: value,
    }));
  };
   const handleFieldChange = (value: itemType) => {
    setAccountForm((prevState) => ({
      ...prevState,
      field: value,
    }));
  };
  const handleStateChange = (value: itemType) => {
    setAccountForm((prevState) => ({
      ...prevState,
      state: value,
    }));
  };
  const handleNameChange = (value: string) => {
    setAccountForm((prevState) => ({
      ...prevState,
      name: {
        ...prevState.name,
        value,
        error: '', 
      },
    }));
  };
  const handlePhoneChange = (value: string) => {
    setAccountForm((prevState) => ({
      ...prevState,
      phone: {
        ...prevState.phone,
        value,
        error: '', 
      },
    }));
  };

   const saveChange=async()=>{
    const isValid = validateForm();
    if(isValid){
        try {
       
            if(account){
                const data=await updateAccount(account.id,accountForm.name.value,accountForm.phone.value)
               
              if(data) {
              //update supplier
             if(supplier){
              const updatedSupplier:SupplierType={
                id:supplier.id,
                description:accountForm.description || supplier.description,
                field:accountForm.field || supplier.field,
                state:accountForm.state  || supplier.state
              }
              const supplierData=await updateSupplier(updatedSupplier)
              setSupplier(supplierData)
             }
                client.upsertUser(
                  { id:account.id,
                    name:accountForm.name.value}
                )
               
                 setAccount(data)
                 toast.show(
                  language?.id === 'en'
                    ? 'Account updated successfully'
                    : language?.id === 'fr'
                    ? 'Compte mis à jour avec succès'
                    : 'تم تحديث الحساب بنجاح',
                  {
                    type: "success"
                  }
                );
                 router.back()   

              }
    
            }
        } catch (error) {
            console.log(error)
        }
    }
  
   }

   const onChange=()=>{
       setopenSave(false)
       router.back()
    }
  
    if(!language) return null
  return (
<>
<SafeAreaView className='bg-white relative dark:bg-dark-500 h-full p-6 space-y-4'>
<PageHeader title={accountTranslations.accountTitle}/>
     
     <ScrollView className='' showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
    <View className='flex items-center '>
  <View className='relative '>
  <Avatar size='Large' url={account?.avatar} uplaod={false}/> 
 <View className='absolute right-0 bottom-0 bg-white dark:bg-dark-400 p-1 rounded-full shadow-black shadow-md border border-neutral-200 dark:border-dark-200'>
 <Feather name="camera" size={20} color="black" />
 </View>
  </View>
   <View className='space-y-2 items-center'>
   <View>
   <Text className='text-2xl text-center font-medium text-black dark:text-white'>{account?.name}</Text>
   <Text className='text-neutral-400 text-center'>{account?.username}</Text>
   </View>
    <View className="bg-purple-100 items-center justify-center flex-row space-x-2 py-1 px-3 border border-purple-500 rounded-full">
    <MaterialIcons name="local-shipping" size={24} color="#a855f7" />
      <Text className='text-purple-500 text-xs font-kufi-semi-bold leading-7'>
        {
        language?.id==='en'?'Supplier':language?.id==='fr'?'Fournisseur':'مورد'
        }
        </Text>
          
          </View>
   </View>
    </View>
     <Input 
     title={accountTranslations.nameLabel}
     type='text'
     placeholder='John Doe'
     value={accountForm.name.value}
     onChange={handleNameChange}
     error={accountForm.name.error}
     />
    <ErrorMessage error={accountForm.name.error}/>
     
     <PhoneInput onChange={handlePhoneChange} value={accountForm.phone.value}/>

  
     <Dropdown 
          description={translations.stateDescription[language.id]}
        list={states}
        selectedItem={accountForm.state}
        onChange={handleStateChange}
        title={translations.stateTitle[language.id]}
        />
          <Dropdown 
         description={translations.fieldDescription[language.id]}
        list={supplierFields}
        selectedItem={accountForm.field}
        onChange={handleFieldChange}
        title={translations.fieldTitle[language.id]}
        />
     <TextArea 
      placeholder={translations.descriptionPlaceholder[language.id]}
      title={translations.descriptionTitle[language.id]}
     error=''
     onChange={handleDescriptionChange}
     value={accountForm.description}
     />

   
     </ScrollView>
   <View>
   <Button onChange={async()=>setopen(true)} title={accountTranslations.saveChangeButton}/>
   </View>
</SafeAreaView>
<ConfirmModal
onChange={saveChange}
description={language?.id==='en'?"Are you sure you want to save the changes to your account information?":language?.id==='fr'?"Êtes-vous sûr de vouloir enregistrer les modifications de vos informations de compte ?":"هل أنت متأكد أنك تريد حفظ التغييرات على معلومات حسابك؟"}
open={open}
setOpen={setopen}
title={language?.id==='en'?"Confirm Changes":language?.id==='fr'?"Confirmer les modifications":"تأكيد التغييرات"}

/>

</>
  )
}

export default SupplierAccount