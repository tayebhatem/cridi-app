import { LanguageType } from "@/types";

export const settingsTranslation =(language:LanguageType | null)=>{
  return  {
        settingsTile:language?.id==='en'?"Settings":language?.id==='fr'?"Paramètres":"الإعدادات",
        account: language?.id === 'en' ? 'Account' : language?.id === 'fr' ? 'Compte' : 'الحساب',
        password: language?.id === 'en' ? 'Password' : language?.id === 'fr' ? 'Mot de passe' : 'كلمة المرور',
        notifications: language?.id === 'en' ? 'Notifications' : language?.id === 'fr' ? 'Notifications' : 'الإشعارات',
        languageLabel: language?.id === 'en' ? 'Language' : language?.id === 'fr' ? 'Langue' : 'اللغة',
        report: language?.id === 'en' ? 'Report' : language?.id === 'fr' ? 'Signaler' : 'التقرير',
        faq: language?.id === 'en' ? 'FAQ' : language?.id === 'fr' ? 'FAQ' : 'الأسئلة الشائعة',
        logout: language?.id === 'en' ? 'Logout' : language?.id === 'fr' ? 'Se déconnecter' : 'تسجيل الخروج',
        logoutConfirmTitle: language?.id === 'en' ? 'Do you really want to logout?' : language?.id === 'fr' ? 'Voulez-vous vraiment vous déconnecter?' : 'هل تريد حقًا تسجيل الخروج؟',
        logoutConfirmDesc: language?.id === 'en' ? 'Confirm if you want to logout now' : language?.id === 'fr' ? 'Confirmez si vous souhaitez vous déconnecter maintenant' : 'تأكيد إذا كنت تريد تسجيل الخروج الآن'
      }
} ;

export const accountTranslation =(language:LanguageType | null)=> {
     return{
        accountTitle: language?.id === 'en' ? 'Account' : language?.id === 'fr' ? 'Compte' : 'الحساب',
        nameLabel: language?.id === 'en' ? 'Name' : language?.id === 'fr' ? 'Nom' : 'الاسم',
        phoneLabel: language?.id === 'en' ? 'Phone' : language?.id === 'fr' ? 'Téléphone' : 'الهاتف',
        saveChangeButton: language?.id === 'en' ? 'Save change' : language?.id === 'fr' ? 'Sauvegarder' : 'حفظ التغييرات',
        nameRequired: language?.id === 'en' ? 'Name is required.' : language?.id === 'fr' ? 'Le nom est requis.' : 'الاسم مطلوب.',
        backNowTitle: language?.id === 'en' ? 'Back Now' : language?.id === 'fr' ? 'Retour maintenant' : 'العودة الآن',
        successMessage: language?.id === 'en' ? 'Your account has been saved successfully.' : language?.id === 'fr' ? 'Votre compte a été enregistré avec succès.' : 'تم حفظ حسابك بنجاح.',
     }
  };

  export const passwordTranslation =(language:LanguageType | null)=> {
    return{
    passwordTitle: language?.id === 'en' ? 'Password' : language?.id === 'fr' ? 'Mot de passe' : 'كلمة المرور',
    currentPassword: language?.id === 'en' ? 'Current Password' : language?.id === 'fr' ? 'Mot de passe actuel' : 'كلمة المرور الحالية',
    newPassword: language?.id === 'en' ? 'New Password' : language?.id === 'fr' ? 'Nouveau mot de passe' : 'كلمة المرور الجديدة',
    confirmPassword: language?.id === 'en' ? 'Confirm Password' : language?.id === 'fr' ? 'Confirmer le mot de passe' : 'تأكيد كلمة المرور',
    saveChangeButton: language?.id === 'en' ? 'Save Change' : language?.id === 'fr' ? 'Sauvegarder' : 'حفظ التغييرات',
    passwordTooShort: language?.id === 'en' ? 'Password must be at least 6 characters long' : language?.id === 'fr' ? 'Le mot de passe doit comporter au moins 6 caractères' : 'يجب أن تكون كلمة المرور 6 أحرف على الأقل',
    passwordMismatch: language?.id === 'en' ? 'Password does not match' : language?.id === 'fr' ? 'Le mot de passe ne correspond pas' : 'كلمة المرور غير متطابقة',
    wrongCurrentPassword: language?.id === 'en' ? 'Current password is wrong' : language?.id === 'fr' ? 'Le mot de passe actuel est incorrect' : 'كلمة المرور الحالية خاطئة',
    backToSettings: language?.id === 'en' ? 'Back to settings' : language?.id === 'fr' ? 'Retour aux paramètres' : 'العودة إلى الإعدادات',
    successMessage: language?.id === 'en' ? 'Your password has been changed successfully.' : language?.id === 'fr' ? 'Votre mot de passe a été modifié avec succès.' : 'تم تغيير كلمة المرور بنجاح.',
    }
 };

 export const notificationsTranslation =(language:LanguageType | null)=> {
    return{
        notificationsTitle: language?.id === 'en' ? 'Notifications' : language?.id === 'fr' ? 'Notifications' : 'إشعارات',
        messagesNotifications: language?.id === 'en' ? 'Messages notifications' : language?.id === 'fr' ? 'Notifications de messages' : 'إشعارات الرسائل',
        debtsNotifications: language?.id === 'en' ? 'Debts and payments notifications' : language?.id === 'fr' ? 'Notifications de crédits et de paiements' : 'إشعارات الديون الدفعات',
        publicationsNotifications: language?.id === 'en' ? 'Publications notifications' : language?.id === 'fr' ? 'Notifications de publications' : 'إشعارات المنشورات',
      };
    
 };

 export const reportTranslation =(language:LanguageType | null)=> {
    return{
        reportTitle: language?.id === 'en' ? 'Report' : language?.id === 'fr' ? 'Signaler' : 'تقرير',
        messageTitle: language?.id === 'en' ? 'Message' : language?.id === 'fr' ? 'Message' : 'رسالة',
        messagePlaceholder: language?.id === 'en' ? 'Report something here...' : language?.id === 'fr' ? 'Signalez quelque chose ici...' : 'أبلغ عن شيء هنا...',
        confirmButton: language?.id === 'en' ? 'Confirm' : language?.id === 'fr' ? 'Confirmer' : 'تأكيد',
        errorMessageRequired: language?.id === 'en' ? 'Message is required' : language?.id === 'fr' ? 'Le message est requis' : 'الرسالة مطلوبة',
        backToSettings: language?.id === 'en' ? 'Back to settings' : language?.id === 'fr' ? 'Retour aux paramètres' : 'العودة إلى الإعدادات',
        reportSuccessMessage: language?.id === 'en' ? 'Report has been sent successfully.' : language?.id === 'fr' ? 'Le rapport a été envoyé avec succès.' : 'تم إرسال التقرير بنجاح.',
    }
 };

 export const FAQTranslation =(language:LanguageType | null)=> {
    return{
   
    }
 };

 export const dashboardTranslation =(language:LanguageType | null)=> {
    return{
   
    }
 };

 export const storeTransaltion =(language:LanguageType | null)=> {
    return{
   
    }
 };