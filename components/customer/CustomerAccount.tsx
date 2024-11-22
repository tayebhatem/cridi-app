import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Avatar from "@/components/ui/Avatar";
import useAccountStore from "@/stores/useAccountStore";
import Input from "@/components/ui/Input";

import { useRouter } from "expo-router";
import { updateAccount } from "@/libs/appwrite";
import useLanguageStore from "@/stores/useLanguageStore";
import { accountTranslation } from "@/constants/translation";
import ConfirmModal from "@/components/ui/ConfirmModal";
import { useChatContext } from "stream-chat-expo";
import { Feather, FontAwesome5 } from "@expo/vector-icons";
import PhoneInput from "@/components/ui/PhoneInput";
import ErrorMessage from "../ui/ErrorMessage";
import { useToast } from "react-native-toast-notifications";
import { Button, Spinner } from "tamagui";

const CustomerAccount = () => {
  const { account, setAccount } = useAccountStore();
  const router = useRouter();
  const { client } = useChatContext();
  const [open, setopen] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const toast = useToast();
  const [accountForm, setAccountForm] = useState({
    name: {
      value: "",
      error: "",
    },
    phone: {
      value: "",
      error: "",
    },
  });

  const { language } = useLanguageStore();
  const accountTranslations = accountTranslation(language);

  const validateForm = () => {
    let valid = true;
    if (accountForm.name.value.trim().length === 0) {
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

  const handleNameChange = (value: string) => {
    setAccountForm((prevState) => ({
      ...prevState,
      name: {
        ...prevState.name,
        value,
        error: "",
      },
    }));
  };
  const handlePhoneChange = (value: string) => {
    setAccountForm((prevState) => ({
      ...prevState,
      phone: {
        ...prevState.phone,
        value,
        error: "",
      },
    }));
  };

  const saveChange = async () => {
    const isValid = validateForm();
    if (isValid) {
      setisLoading(true);
      try {
        if (account) {
          const data = await updateAccount(
            account.id,
            accountForm.name.value,
            accountForm.phone.value
          );

          if (data) {
            client.upsertUser({ id: account.id, name: accountForm.name.value });

            setAccount(data);
            toast.show(
              language?.id === "en"
                ? "Account updated successfully"
                : language?.id === "fr"
                ? "Compte mis à jour avec succès"
                : "تم تحديث الحساب بنجاح",
              {
                type: "success",
              }
            );
            router.back();
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        setisLoading(false);
      }
    }
  };

  useEffect(() => {
    if (account) {
      setAccountForm({
        name: {
          value: account?.name,
          error: "",
        },
        phone: {
          value: account.phone,
          error: "",
        },
      });
    }
  }, [account]);

  return (
    <>
      <SafeAreaView className="bg-white dark:bg-dark-500 h-full px-4 ">
        <ScrollView
          className=""
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <View className="flex items-center ">
            <View className="relative ">
              <Avatar size="Large" url={account?.avatar} uplaod={false} />
              <View className="absolute right-0 bottom-0 bg-white dark:bg-dark-400 p-1 rounded-full shadow-black shadow-md border border-neutral-200 dark:border-dark-200">
                <Feather name="camera" size={20} color="black" />
              </View>
            </View>
            <View className="space-y-2 items-center">
              <View>
                <Text className="text-2xl text-center font-medium text-black dark:text-white">
                  {account?.name}
                </Text>
                <Text className="text-neutral-400 text-center">
                  {account?.username}
                </Text>
              </View>
              <View className="bg-green-100 items-center justify-center flex-row space-x-2  px-3 border border-green-500 rounded-full">
                <FontAwesome5 name="user-tie" size={20} color="#22c55e" />
                <Text className="text-green-500 text-xs font-kufi-semi-bold leading-7">
                  {language?.id === "en"
                    ? "Customer"
                    : language?.id === "fr"
                    ? "Client"
                    : "زبون"}
                </Text>
              </View>
            </View>
          </View>
          <Input
            title={accountTranslations.nameLabel}
            type="text"
            placeholder="John Doe"
            value={accountForm.name.value}
            onChange={handleNameChange}
            error={accountForm.name.error}
          />
          <ErrorMessage error={accountForm.name.error} />

          <PhoneInput
            onChange={handlePhoneChange}
            value={accountForm.phone.value}
          />
        </ScrollView>
        <View>
          <Button
            onPress={() => setopen(true)}
            className="bg-primary-500 text-white"
            size={"$6"}
            disabled={isLoading}
            icon={isLoading ? () => <Spinner color={"white"} /> : undefined}
          >
            <Text className="text-white font-kufi-medium ">
              {accountTranslations.saveChangeButton}
            </Text>
          </Button>
        </View>
      </SafeAreaView>
      <ConfirmModal
        onChange={saveChange}
        description={
          language?.id === "en"
            ? "Are you sure you want to save the changes to your account information?"
            : language?.id === "fr"
            ? "Êtes-vous sûr de vouloir enregistrer les modifications de vos informations de compte ?"
            : "هل أنت متأكد أنك تريد حفظ التغييرات على معلومات حسابك؟"
        }
        open={open}
        setOpen={setopen}
        title={
          language?.id === "en"
            ? "Confirm Changes"
            : language?.id === "fr"
            ? "Confirmer les modifications"
            : "تأكيد التغييرات"
        }
      />
    </>
  );
};

export default CustomerAccount;
