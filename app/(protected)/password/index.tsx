import { View, Text } from "react-native";
import React, { useState } from "react";
import Input from "@/components/ui/Input";

import { checkCurrentPassword, updatePassword } from "@/libs/appwrite";
import useAccountStore from "@/stores/useAccountStore";

import useLanguageStore from "@/stores/useLanguageStore";
import { passwordTranslation } from "@/constants/translation";
import ConfirmModal from "@/components/ui/ConfirmModal";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { SafeAreaView } from "react-native-safe-area-context";
import { useToast } from "react-native-toast-notifications";
import { Button, Spinner } from "tamagui";

const PasswordScreen = () => {
  const { account } = useAccountStore();
  const [showSuccess, setshowSuccess] = useState(false);
  const [open, setopen] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: {
      value: "",
      error: "",
    },
    newPassword: {
      value: "",
      error: "",
    },
    confirmNewPassword: {
      value: "",
      error: "",
    },
  });
  const { language } = useLanguageStore();
  const password = passwordTranslation(language);
  const toast = useToast();
  const handleCurrentPasswordChange = (value: string) => {
    setPasswordForm((prevState) => ({
      ...prevState,
      currentPassword: {
        ...prevState.currentPassword,
        value,
        error: "",
      },
    }));
  };
  const handleNewPasswordChange = (value: string) => {
    setPasswordForm((prevState) => ({
      ...prevState,
      newPassword: {
        ...prevState.newPassword,
        value,
        error: "",
      },
    }));
  };
  const handleConfrimNewPasswordChange = (value: string) => {
    setPasswordForm((prevState) => ({
      ...prevState,
      confirmNewPassword: {
        ...prevState.confirmNewPassword,
        value,
        error: "",
      },
    }));
  };

  const validateForm = async () => {
    let valid = true;

    if (passwordForm.currentPassword.value.trim().length < 6) {
      setPasswordForm((prevState) => ({
        ...prevState,
        currentPassword: {
          ...prevState.currentPassword,
          error: password.passwordTooShort,
        },
      }));
      valid = false;
    }
    if (passwordForm.newPassword.value.trim().length < 6) {
      setPasswordForm((prevState) => ({
        ...prevState,
        newPassword: {
          ...prevState.newPassword,
          error: password.passwordTooShort,
        },
      }));
      valid = false;
    }

    if (passwordForm.confirmNewPassword.value.trim().length < 6) {
      setPasswordForm((prevState) => ({
        ...prevState,
        confirmNewPassword: {
          ...prevState.confirmNewPassword,
          error: password.passwordTooShort,
        },
      }));
      valid = false;
    }

    if (
      passwordForm.confirmNewPassword.value !== passwordForm.newPassword.value
    ) {
      setPasswordForm((prevState) => ({
        ...prevState,
        confirmNewPassword: {
          ...prevState.confirmNewPassword,
          error: password.passwordMismatch,
        },
      }));
      valid = false;
    }

    if (!account) return;
    const isOldPassword = await checkCurrentPassword(
      account?.id,
      passwordForm.currentPassword.value
    );
    if (!isOldPassword) {
      setPasswordForm((prevState) => ({
        ...prevState,
        currentPassword: {
          ...prevState.currentPassword,
          error: password.wrongCurrentPassword,
        },
      }));

      valid = false;
    }
    return valid;
  };
  const resetForm = () => {
    setPasswordForm({
      currentPassword: { value: "", error: "" },
      newPassword: { value: "", error: "" },
      confirmNewPassword: { value: "", error: "" },
    });
  };
  const confirm = async () => {
    if (account) {
      setisLoading(true);
      try {
        const data = await updatePassword(
          account.id,
          passwordForm.newPassword.value
        );
        if (data) {
          resetForm();
          setopen(false);
          toast.show(password.successMessage, {
            type: "success",
          });
        }
      } catch (error) {
        if (error instanceof Error) {
          console.log(error);
        }
      } finally {
        setisLoading(false);
      }
    }
  };
  const onSave = async () => {
    const isValid = await validateForm();
    if (isValid) {
      setopen(true);
    }
  };
  return (
    <>
      <SafeAreaView className="bg-white dark:bg-dark-500 px-4 space-y-4 h-full">
        <View>
          <Input
            error={passwordForm.currentPassword.error}
            onChange={handleCurrentPasswordChange}
            placeholder="*******"
            title={password.currentPassword}
            type="password"
            value={passwordForm.currentPassword.value}
          />
          <ErrorMessage error={passwordForm.currentPassword.error} />

          <Input
            error={passwordForm.newPassword.error}
            onChange={handleNewPasswordChange}
            placeholder="*******"
            title={password.newPassword}
            type="password"
            value={passwordForm.newPassword.value}
          />
          <ErrorMessage error={passwordForm.newPassword.error} />

          <Input
            error={passwordForm.confirmNewPassword.error}
            onChange={handleConfrimNewPasswordChange}
            placeholder="*******"
            title={password.confirmPassword}
            type="password"
            value={passwordForm.confirmNewPassword.value}
          />
          <ErrorMessage error={passwordForm.confirmNewPassword.error} />
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
              {password.saveChangeButton}
            </Text>
          </Button>
        </View>
      </SafeAreaView>
      <ConfirmModal
        onChange={confirm}
        description={
          language?.id === "en"
            ? "Are you sure you want to change your password?"
            : language?.id === "fr"
            ? "Êtes-vous sûr de vouloir changer votre mot de passe ?"
            : "هل أنت متأكد أنك تريد تغيير كلمة المرور؟"
        }
        open={open}
        setOpen={setopen}
        title={
          language?.id === "en"
            ? "Confirm Password Change"
            : language?.id === "fr"
            ? "Confirmer le changement de mot de passe"
            : "تأكيد تغيير كلمة المرور"
        }
      />
    </>
  );
};

export default PasswordScreen;
