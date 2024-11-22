import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { states, supplierFields } from "@/constants/supplier";
import useAccountStore from "@/stores/useAccountStore";
import { itemType, SupplierType } from "@/types";
import { createSupplier } from "@/libs/appwrite";
import { router } from "expo-router";
import useLanguageStore from "@/stores/useLanguageStore";
import TextArea from "@/components/ui/TextArea";
import Dropdown from "@/components/ui/Dropdown";

import Loader from "@/components/ui/Loader";
import { Button, Spinner } from "tamagui";
import { Truck } from "@tamagui/lucide-icons";

const SupplierScreen = () => {
  const { language } = useLanguageStore();

  const [isLoading, setisLoading] = useState(false);
  const { setSupplier, account } = useAccountStore();
  const [supplierForm, setSupplierForm] = useState({
    description: "",
    state: states[0],
    field: supplierFields[0],
  });

  const translations = {
    stateTitle: {
      en: "State",
      fr: "Wilaya",
      ar: "الولاية",
    },
    stateDescription: {
      en: "Select the current state",
      fr: "Sélectionnez la wilaya actuelle",
      ar: "حدد الولاية الحالية .",
    },
    fieldTitle: {
      en: "Field",
      fr: "Domaine",
      ar: "المجال",
    },
    fieldDescription: {
      en: "Choose the supplier’s area of expertise or industry.",
      fr: "Choisissez le domaine d'expertise ou l'industrie du fournisseur.",
      ar: "اختر مجال الخبرة أو الصناعة للمورد.",
    },
    descriptionTitle: {
      en: "Description",
      fr: "Description",
      ar: "الوصف",
    },
    descriptionPlaceholder: {
      en: "Write description...",
      fr: "Écrire une description...",
      ar: "اكتب وصفا...",
    },
    saveButton: {
      en: "Save",
      fr: "Enregistrer",
      ar: "حفظ",
    },
  };

  const handleDescriptionChange = (value: string) => {
    setSupplierForm((prevState) => ({
      ...prevState,
      description: value,
    }));
  };

  const handleFieldChange = (value: itemType) => {
    setSupplierForm((prevState) => ({
      ...prevState,
      field: value,
    }));
  };

  const handleStateChange = (value: itemType) => {
    setSupplierForm((prevState) => ({
      ...prevState,
      state: value,
    }));
  };

  const onSave = async () => {
    if (account) {
      setisLoading(true);
      try {
        const supplier: SupplierType = {
          id: "",
          description: supplierForm.description,
          field: supplierForm.field,
          state: supplierForm.state,
        };

        const newSupplier = await createSupplier(account.id, supplier);
        if (newSupplier) {
          setSupplier(newSupplier);
          router.replace("/dashboard");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setisLoading(false);
      }
    }
  };
  if (!language) return <Loader />;
  return (
    <SafeAreaView className="bg-white dark:bg-dark-500 h-full p-6 space-y-4">
      <View>
        <Text className="text-2xl font-kufi-semi-bold">
          {language?.id === "en"
            ? "Complete supplier account"
            : language?.id === "fr"
            ? "Compléter le compte fournisseur"
            : "أكمل حساب المورد"}
        </Text>
        <Text className="text-neutral-400 font-kufi leading-6">
          {language?.id === "en"
            ? "Follow the steps to complete your supplier account setup."
            : language?.id === "fr"
            ? "Suivez les étapes pour compléter la configuration de votre compte fournisseur."
            : "اتبع الخطوات لإكمال إعداد حساب المورد الخاص بك."}
        </Text>
      </View>

      <View>
        <Dropdown
          description={translations.stateDescription[language.id]}
          list={states}
          selectedItem={supplierForm.state}
          onChange={handleStateChange}
          title={translations.stateTitle[language.id]}
        />
        <Dropdown
          description={translations.fieldDescription[language.id]}
          list={supplierFields}
          selectedItem={supplierForm.field}
          onChange={handleFieldChange}
          title={translations.fieldTitle[language.id]}
        />
        <TextArea
          placeholder={translations.descriptionPlaceholder[language.id]}
          title={translations.descriptionTitle[language.id]}
          error=""
          onChange={handleDescriptionChange}
          value={supplierForm.description}
        />
      </View>
      <View>
        <Button
          onPress={onSave}
          className="bg-primary-500 text-white"
          size={"$6"}
          disabled={isLoading}
          icon={isLoading ? () => <Spinner color={"white"} /> : undefined}
        >
          <Text className="text-white font-kufi-medium ">
            {translations.saveButton[language.id]}
          </Text>
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default SupplierScreen;
