import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import PageLayout from '@/components/ui/PageLayout'
import PageHeader from '@/components/ui/PageHeader'
import CardLayout from '@/components/ui/CardLayout';
import AccordionItem from '@/components/ui/AccordionItem';
import useLanguageStore from '@/stores/useLanguageStore';

const FAQScreen = () => {
    const { language } = useLanguageStore();

    // Translations
    const FAQ_DATA = [
      {
        id: '1',
        question: language?.id === 'en' ? 'What is this app about?' : language?.id === 'fr' ? "De quoi s'agit-il dans cette application?" : 'ما هي هذه التطبيق؟',
        answer: language?.id === 'en' ? 'This app helps clients and suppliers manage debts and payments easily...' : language?.id === 'fr' ? "Cette application aide les clients et fournisseurs à gérer leurs crédits..." : 'يساعد هذا التطبيق العملاء والموردين على إدارة الديون والمدفوعات بسهولة...'
      },
      {
        id: '2',
        question: language?.id === 'en' ? 'How can I track my debts and payments?' : language?.id === 'fr' ? 'Comment puis-je suivre mes dettes et paiements?' : 'كيف أتابع ديوني ومدفوعاتي؟',
        answer: language?.id === 'en' ? 'You can view all your debts and payments under the "Debt Management" section...' : language?.id === 'fr' ? 'Vous pouvez voir toutes vos dettes et paiements sous la section "Gestion des dettes"...' : 'يمكنك عرض جميع ديونك ومدفوعاتك ضمن قسم "إدارة الديون"...'
      },
      {
        id: '3',
        question: language?.id === 'en' ? 'Will I get notifications for upcoming payments?' : language?.id === 'fr' ? 'Vais-je recevoir des notifications pour les paiements à venir?' : 'هل سأحصل على إشعارات للمدفوعات القادمة؟',
        answer: language?.id === 'en' ? 'Yes! The app sends notifications whenever a payment is due...' : language?.id === 'fr' ? 'Oui! L\'application envoie des notifications chaque fois qu\'un paiement est dû...' : 'نعم! يرسل التطبيق إشعارات كلما كان هناك دفعة مستحقة...'
      },
      {
        id: '4',
        question: language?.id === 'en' ? 'How do I receive notifications from stores?' : language?.id === 'fr' ? 'Comment puis-je recevoir des notifications des magasins?' : 'كيف أتلقى إشعارات من المتاجر؟',
        answer: language?.id === 'en' ? 'You will receive an in-app notification when a store sends you a message...' : language?.id === 'fr' ? 'Vous recevrez une notification dans l\'application lorsque un magasin vous envoie un message...' : 'ستتلقى إشعارًا داخل التطبيق عندما يرسل لك متجر رسالة...'
      },
      {
        id: '5',
        question: language?.id === 'en' ? 'Can I update my personal or account information?' : language?.id === 'fr' ? 'Puis-je mettre à jour mes informations personnelles ou de compte?' : 'هل يمكنني تحديث معلوماتي الشخصية أو معلومات الحساب؟',
        answer: language?.id === 'en' ? 'You can update your profile details in the "Account Settings" section...' : language?.id === 'fr' ? 'Vous pouvez mettre à jour les détails de votre profil dans la section "Paramètres du compte"...' : 'يمكنك تحديث تفاصيل ملفك الشخصي في قسم "إعدادات الحساب"...'
      },
      {
        id: '6',
        question: language?.id === 'en' ? 'How secure is my data?' : language?.id === 'fr' ? 'À quel point mes données sont-elles sécurisées?' : 'ما مدى أمان بياناتي؟',
        answer: language?.id === 'en' ? 'Your data is securely stored following industry standards...' : language?.id === 'fr' ? 'Vos données sont stockées en toute sécurité selon les normes de l\'industrie...' : 'يتم تخزين بياناتك بأمان وفقًا للمعايير الصناعية...'
      }
    ];
    const FAQItem = ({ item }:{item:any}) => {
        return (
        <AccordionItem title={item.question} text={item.answer} key={item.id}/>
        );
      };
  return (
   <PageLayout>
    <PageHeader title={language?.id === 'en' ? 'FAQ' : language?.id === 'fr' ? 'FAQ' : 'الأسئلة المتداولة'}/>
    <View>
        <CardLayout>
         <FlatList
         showsHorizontalScrollIndicator={false}
         showsVerticalScrollIndicator={false}
         data={FAQ_DATA}
         renderItem={FAQItem}
         keyExtractor={item=>item.id}
         />    
        </CardLayout>
    </View>
   </PageLayout>
  )
}

export default FAQScreen