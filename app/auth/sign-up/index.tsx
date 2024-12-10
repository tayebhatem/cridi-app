import {
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Input from "@/components/ui/Input";
import { Check as CheckIcon } from "@tamagui/lucide-icons";
import { Link, useRouter } from "expo-router";
import { createAccount } from "@/libs/appwrite";
import Alert from "@/components/ui/Alert";
import useLanguageStore from "@/stores/useLanguageStore";
import Logo from "@/components/ui/Logo";
import LanguageButton from "@/components/ui/LanguageButton";
import * as WebBrowser from "expo-web-browser";
import { FontAwesome } from "@expo/vector-icons";
import ErrorMessage from "@/components/ui/ErrorMessage";
import useAccountStore from "@/stores/useAccountStore";
import { states, supplierFields } from "@/constants/supplier";
import { Button, Checkbox, Spinner } from "tamagui";
const SignUpScreen = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const { language } = useLanguageStore();
  const { setAccount, setSupplier } = useAccountStore();
  const [registerForm, setRegisterForm] = useState({
    name: {
      value: "",
      error: "",
    },
    username: {
      value: "",
      error: "",
    },
    password: {
      value: "",
      error: "",
    },
    confirmPassword: {
      value: "",
      error: "",
    },
    policy: {
      value: false,
      error: "",
    },
  });

  const validateForm = () => {
    let valid = true;

    // Validate username
    if (registerForm.name.value.trim().length < 6) {
      setRegisterForm((prevState) => ({
        ...prevState,
        name: {
          ...prevState.name,
          error:
            language?.id === "en"
              ? "Name must be at least 6 characters long"
              : language?.id === "fr"
              ? "Le nom  doit comporter au moins 6 caractères"
              : "يجب أن يتكون الإسم من 6 أحرف على الأقل",
        },
      }));
      valid = false;
    }

    // Validate username
    if (registerForm.username.value.trim().length < 6) {
      setRegisterForm((prevState) => ({
        ...prevState,
        username: {
          ...prevState.username,
          error:
            language?.id === "en"
              ? "Username must be at least 6 characters long"
              : language?.id === "fr"
              ? "Le nom d'utilisateur doit comporter au moins 6 caractères"
              : "يجب أن يتكون إسم المستخدم من 6 أحرف على الأقل",
        },
      }));
      valid = false;
    }

    // Validate password
    if (registerForm.password.value.trim().length < 6) {
      setRegisterForm((prevState) => ({
        ...prevState,
        password: {
          ...prevState.password,
          error:
            language?.id === "en"
              ? "Password must be at least 6 characters long"
              : language?.id === "fr"
              ? "Le mot de passe doit comporter au moins 6 caractères"
              : "يجب أن تتكون كلمة المرور من 6 أحرف على الأقل",
        },
      }));
      valid = false;
    }
    if (registerForm.confirmPassword.value.trim().length < 6) {
      setRegisterForm((prevState) => ({
        ...prevState,
        confirmPassword: {
          ...prevState.confirmPassword,
          error:
            language?.id === "en"
              ? "Password must be at least 6 characters long"
              : language?.id === "fr"
              ? "Le mot de passe doit comporter au moins 6 caractères"
              : "يجب أن تتكون كلمة المرور من 6 أحرف على الأقل",
        },
      }));
      valid = false;
    }
    // Validate password confirmation
    if (registerForm.confirmPassword.value !== registerForm.password.value) {
      setRegisterForm((prevState) => ({
        ...prevState,
        confirmPassword: {
          ...prevState.confirmPassword,
          error:
            language?.id === "en"
              ? "Passwords do not match."
              : language?.id === "fr"
              ? "Les mots de passe ne correspondent pas."
              : "كلمات المرور غير متطابقة.",
        },
      }));
      valid = false;
    }
    if (!registerForm.policy.value) {
      setRegisterForm((prevState) => ({
        ...prevState,
        policy: {
          ...prevState.policy,
          error:
            language?.id === "en"
              ? "Have to accept terms and policies"
              : language?.id === "fr"
              ? "Doit accepter les termes et politiques"
              : "يجب أن تقبل الشروط والسياسات",
        },
      }));
      valid = false;
    }
    return valid;
  };
  const handleChangePolicy = () => {
    setRegisterForm((prevState) => ({
      ...prevState,
      policy: {
        value: !registerForm.policy.value,
        error: "", // Clear error on input change
      },
    }));
  };

  const handleSubmit = async () => {
    const isValid = validateForm();

    if (isValid) {
      setisLoading(true);
      try {
        const { username, password, name } = registerForm;
        const session = await createAccount(
          username.value,
          name.value,
          password.value
        );
        if (session) {
          setAccount({
            id: session.account.$id,
            name: session.account.name,
            username: session.account.username,
            email: session.account.email,
            type: session.account.type,
            avatar: session.account.avatar,
            phone: session.account.phone,
            verified: session.account.verified,
          });
          if (session.account.supplier) {
            setSupplier({
              id: session.account.supplier.$id,
              description: session.account.supplier.description,
              field:
                supplierFields.find(
                  (item) => item.id === session.account.supplier.field
                ) || supplierFields[0],
              state:
                states.find(
                  (item) => item.id === session.account.supplier.state
                ) || states[0],
            });
          }
          router.push("/auth/send-account-otp");
        }
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
          if (
            error.message ===
            "Document with the requested ID already exists. Try again with a different ID or use ID.unique() to generate a unique ID."
          ) {
            const errorMessage =
              language?.id === "en"
                ? "Username already exists"
                : language?.id === "fr"
                ? "Le nom d'utilisateur existe déjà."
                : "اسم المستخدم موجود.";
            setRegisterForm((prevState) => ({
              ...prevState,
              username: {
                ...prevState.username,
                error: errorMessage,
              },
            }));
          } else {
            setError(
              language?.id === "en"
                ? error.message
                : language?.id === "fr"
                ? "Une erreur s'est produite."
                : "حدث خطأ ما."
            );
            setOpen(true);
          }
        }
      } finally {
        setisLoading(false);
      }
    }
  };

  return (
    <>
      <SafeAreaView className="bg-white p-6 h-full ">
        <ScrollView
          className="h-full space-y-3"
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <LanguageButton />
          

          <View className="pt-8">
            <Text className="text-2xl font-kufi-semi-bold">
              {language?.id === "en"
                ? "Sign Up"
                : language?.id === "fr"
                ? "Inscription"
                : "إنشاء حساب"}
            </Text>
            <Text className="text-neutral-400 font-kufi leading-6">
              {language?.id === "en"
                ? "Please fill the form to create an account."
                : language?.id === "fr"
                ? "Veuillez remplir le formulaire pour créer un compte."
                : "يرجى ملء النموذج لإنشاء حساب."}
            </Text>
          </View>

          <View>
            <Input
              title={
                language?.id === "en"
                  ? "Name"
                  : language?.id === "fr"
                  ? "Nom"
                  : "الإسم"
              }
              type="text"
              placeholder="John Doe"
              value={registerForm.name.value}
              error={registerForm.name.error}
              onChange={(value) =>
                setRegisterForm((prev) => ({
                  ...prev,
                  name: { value, error: "" },
                }))
              }
            />
            <ErrorMessage error={registerForm.name.error} />

            <Input
              title={
                language?.id === "en"
                  ? "Username"
                  : language?.id === "fr"
                  ? "Nom d'utilisateur"
                  : "إسم المستخدم"
              }
              type="text"
              placeholder="johndoe"
              value={registerForm.username.value}
              error={registerForm.username.error}
              onChange={(value) =>
                setRegisterForm((prev) => ({
                  ...prev,
                  username: { value, error: "" },
                }))
              }
            />
            <ErrorMessage error={registerForm.username.error} />

            <Input
              title={
                language?.id === "en"
                  ? "Password"
                  : language?.id === "fr"
                  ? "Mot de passe"
                  : "كلمة المرور"
              }
              type="password"
              placeholder="*********"
              value={registerForm.password.value}
              error={registerForm.password.error}
              onChange={(value) =>
                setRegisterForm((prev) => ({
                  ...prev,
                  password: { value, error: "" },
                }))
              }
            />
            <ErrorMessage error={registerForm.password.error} />

            <Input
              title={
                language?.id === "en"
                  ? "Confirm Password"
                  : language?.id === "fr"
                  ? "Confirmer le mot de passe"
                  : "تأكيد كلمة المرور"
              }
              type="password"
              placeholder="*********"
              value={registerForm.confirmPassword.value}
              error={registerForm.confirmPassword.error}
              onChange={(value) =>
                setRegisterForm((prev) => ({
                  ...prev,
                  confirmPassword: { value, error: "" },
                }))
              }
            />
            <ErrorMessage error={registerForm.confirmPassword.error} />

            <View className="py-1">
              <View
                className={`flex flex-row items-center gap-x-1.5 ${
                  language?.id === "ar" && "flex-row-reverse"
                }`}
              >
                <Checkbox
                  id="policy"
                  onPress={handleChangePolicy}
                  checked={registerForm.policy.value}
                >
                  <Checkbox.Indicator>
                    <CheckIcon color={"#059669"} />
                  </Checkbox.Indicator>
                </Checkbox>
                <Text className=" font-kufi-medium">
                  {language?.id === "en"
                    ? "Accept"
                    : language?.id === "fr"
                    ? "Accepter"
                    : "إقبل"}
                </Text>
                <Pressable onPress={() => router.push("/policy")}>
                  <Text className="text-primary-500 underline font-kufi-medium">
                    {language?.id === "en"
                      ? "terms and policies"
                      : language?.id === "fr"
                      ? "les termes et politiques"
                      : "الشروط والسياسات"}
                  </Text>
                </Pressable>
              </View>
              <ErrorMessage error={registerForm.policy.error} />
            </View>
          </View>

          <View>
            <Button
              onPress={handleSubmit}
              className="bg-primary-500 text-white"
              size={"$6"}
              disabled={isLoading}
              icon={isLoading ? () => <Spinner color={"white"} /> : undefined}
            >
              <Text className="text-white font-kufi-medium ">
                {language?.id === "en"
                  ? "Sign Up"
                  : language?.id === "fr"
                  ? "Inscription"
                  : "إنشاء حساب"}
              </Text>
            </Button>
          </View>

          <View
            className={`flex py-2 ${
              language?.id === "ar" ? "flex-row-reverse" : "flex-row"
            } items-center gap-x-2 justify-center `}
          >
            <Text className="font-kufi-medium text-center ">
              {language?.id === "en"
                ? "Already have an account?"
                : language?.id === "fr"
                ? "Vous avez déjà un compte ?"
                : "لديك حساب بالفعل؟"}
            </Text>
            <Link
              href={"../sign-in"}
              className="font-kufi-semi-bold text-primary-500 "
            >
              {language?.id === "en"
                ? "Login"
                : language?.id === "fr"
                ? "Connexion"
                : "تسجيل الدخول"}
            </Link>
          </View>
        </ScrollView>
      </SafeAreaView>

      <Alert
        title={
          language?.id === "en"
            ? "Error"
            : language?.id === "fr"
            ? "Erreur"
            : "خطأ"
        }
        type="WARNING"
        description={error}
        onSave={() => setOpen(false)}
        open={open}
      />
    </>
  );
};

export default SignUpScreen;
