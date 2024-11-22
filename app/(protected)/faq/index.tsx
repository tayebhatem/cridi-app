import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import PageHeader from "@/components/ui/PageHeader";
import AccordionItem from "@/components/ui/AccordionItem";
import useLanguageStore from "@/stores/useLanguageStore";
import AccordionList from "@/components/ui/AccordionList";
import { FAQType } from "@/types";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "tamagui";

const FAQScreen = () => {
  const { language } = useLanguageStore();

  const FAQ_DATA: FAQType[] = [
    {
      id: "1",
      question:
        language?.id === "en"
          ? "What is this app about?"
          : language?.id === "fr"
          ? "De quoi s'agit-il dans cette application?"
          : "ما هي هذه التطبيق؟",
      answer:
        language?.id === "en"
          ? "This app helps clients and suppliers manage debts and payments easily by allowing them to track, communicate, and manage their accounts with stores."
          : language?.id === "fr"
          ? "Cette application aide les clients et fournisseurs à gérer leurs crédits et paiements facilement, en leur permettant de suivre, communiquer et gérer leurs comptes avec les magasins."
          : "يساعد هذا التطبيق العملاء والموردين على إدارة الديون والمدفوعات بسهولة من خلال تمكينهم من التتبع والتواصل وإدارة حساباتهم مع المتاجر.",
    },
    {
      id: "2",
      question:
        language?.id === "en"
          ? "How can I track my debts and payments?"
          : language?.id === "fr"
          ? "Comment puis-je suivre mes dettes et paiements?"
          : "كيف أتابع ديوني ومدفوعاتي؟",
      answer:
        language?.id === "en"
          ? 'You can view all your debts and payments under the "Debt Management" section on the app dashboard.'
          : language?.id === "fr"
          ? 'Vous pouvez voir toutes vos dettes et paiements sous la section "Gestion des dettes" dans le tableau de bord de l\'application.'
          : 'يمكنك عرض جميع ديونك ومدفوعاتك ضمن قسم "إدارة الديون" في لوحة التحكم بالتطبيق.',
    },
    {
      id: "3",
      question:
        language?.id === "en"
          ? "Will I get notifications for upcoming payments?"
          : language?.id === "fr"
          ? "Vais-je recevoir des notifications pour les paiements à venir?"
          : "هل سأحصل على إشعارات للمدفوعات القادمة؟",
      answer:
        language?.id === "en"
          ? "Yes! The app sends notifications whenever a payment is due, helping you stay updated on your financial commitments."
          : language?.id === "fr"
          ? "Oui! L'application envoie des notifications chaque fois qu'un paiement est dû, vous aidant à rester informé de vos engagements financiers."
          : "نعم! يرسل التطبيق إشعارات كلما كان هناك دفعة مستحقة، مما يساعدك على متابعة التزاماتك المالية.",
    },
    {
      id: "4",
      question:
        language?.id === "en"
          ? "How do I receive notifications from stores?"
          : language?.id === "fr"
          ? "Comment puis-je recevoir des notifications des magasins?"
          : "كيف أتلقى إشعارات من المتاجر؟",
      answer:
        language?.id === "en"
          ? "You will receive an in-app notification whenever a store sends you a message or updates your debt status."
          : language?.id === "fr"
          ? "Vous recevrez une notification dans l'application chaque fois qu'un magasin vous envoie un message ou met à jour votre statut de dette."
          : "ستتلقى إشعارًا داخل التطبيق كلما أرسل لك متجر رسالة أو قام بتحديث حالة دينك.",
    },
    {
      id: "5",
      question:
        language?.id === "en"
          ? "Can I update my personal or account information?"
          : language?.id === "fr"
          ? "Puis-je mettre à jour mes informations personnelles ou de compte?"
          : "هل يمكنني تحديث معلوماتي الشخصية أو معلومات الحساب؟",
      answer:
        language?.id === "en"
          ? 'You can update your profile details, such as contact information, in the "Account Settings" section of the app.'
          : language?.id === "fr"
          ? 'Vous pouvez mettre à jour les détails de votre profil, comme les informations de contact, dans la section "Paramètres du compte" de l\'application.'
          : 'يمكنك تحديث تفاصيل ملفك الشخصي، مثل معلومات الاتصال، في قسم "إعدادات الحساب" بالتطبيق.',
    },
    {
      id: "6",
      question:
        language?.id === "en"
          ? "How secure is my data?"
          : language?.id === "fr"
          ? "À quel point mes données sont-elles sécurisées?"
          : "ما مدى أمان بياناتي؟",
      answer:
        language?.id === "en"
          ? "Your data is securely stored following industry standards to protect your information and ensure privacy."
          : language?.id === "fr"
          ? "Vos données sont stockées en toute sécurité selon les normes de l'industrie pour protéger vos informations et garantir votre confidentialité."
          : "يتم تخزين بياناتك بأمان وفقًا للمعايير الصناعية لحماية معلوماتك وضمان خصوصيتك.",
    },
    {
      id: "7",
      question:
        language?.id === "en"
          ? "How can I add a new store?"
          : language?.id === "fr"
          ? "Comment puis-je ajouter un nouveau magasin?"
          : "كيف يمكنني إضافة متجر جديد؟",
      answer:
        language?.id === "en"
          ? 'To add a new store, go to the "Stores" section in the app, and click on "Add Store." Follow the prompts to complete the details.'
          : language?.id === "fr"
          ? 'Pour ajouter un nouveau magasin, allez dans la section "Magasins" de l\'application et cliquez sur "Ajouter un magasin". Suivez les étapes pour compléter les détails.'
          : 'لإضافة متجر جديد، انتقل إلى قسم "المتاجر" في التطبيق، واضغط على "إضافة متجر". اتبع التعليمات لإكمال التفاصيل.',
    },
    {
      id: "8",
      question:
        language?.id === "en"
          ? "How do I change my password?"
          : language?.id === "fr"
          ? "Comment puis-je changer mon mot de passe?"
          : "كيف أغير كلمة المرور الخاصة بي؟",
      answer:
        language?.id === "en"
          ? 'You can change your password by going to the "Settings" page, selecting "Change Password," then entering your current and new password.'
          : language?.id === "fr"
          ? 'Vous pouvez changer votre mot de passe en accédant à la page "Paramètres", en sélectionnant "Changer le mot de passe", puis en entrant votre mot de passe actuel et nouveau.'
          : 'يمكنك تغيير كلمة المرور الخاصة بك عن طريق الذهاب إلى صفحة "الإعدادات" واختيار "تغيير كلمة المرور"، ثم إدخال كلمة المرور الحالية والجديدة.',
    },
    {
      id: "9",
      question:
        language?.id === "en"
          ? "How can I report an issue or get support?"
          : language?.id === "fr"
          ? "Comment puis-je signaler un problème ou obtenir de l'aide?"
          : "كيف يمكنني الإبلاغ عن مشكلة أو الحصول على الدعم؟",
      answer:
        language?.id === "en"
          ? 'If you encounter any issues or need assistance, you can report it by going to "Settings" and selecting "Report"'
          : language?.id === "fr"
          ? 'Si vous rencontrez des problèmes ou avez besoin d\'aide, vous pouvez le signaler en allant dans "Paramètres" et en sélectionnant "Signaler".'
          : 'إذا واجهت أي مشاكل أو كنت بحاجة إلى مساعدة، يمكنك الإبلاغ عنها عن طريق الذهاب إلى "الإعدادات" واختيار "الإبلاغ ".',
    },
  ];

  const FAQItem = ({ item }: { item: any }) => {
    return (
      <AccordionItem title={item.question} text={item.answer} key={item.id} />
    );
  };
  return (
    <SafeAreaView className="bg-white dark:bg-dark-500 px-6 space-y-4 h-full">
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <AccordionList list={FAQ_DATA} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default FAQScreen;
