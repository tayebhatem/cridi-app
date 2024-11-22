import { View, Text, ToastAndroid } from "react-native";
import React, { useEffect, useState } from "react";
import PageHeader from "@/components/ui/PageHeader";

import TextArea from "@/components/ui/TextArea";
import useLanguageStore from "@/stores/useLanguageStore";
import { reportTranslation } from "@/constants/translation";
import { sendReport } from "@/libs/appwrite";
import useAccountStore from "@/stores/useAccountStore";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { SafeAreaView } from "react-native-safe-area-context";
import { useToast } from "react-native-toast-notifications";

import { router } from "expo-router";
import { Button, Spinner } from "tamagui";

const ReportPage = () => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const { account } = useAccountStore();
  const { language } = useLanguageStore();

  const [isLoading, setisLoading] = useState(false);
  const report = reportTranslation(language);
  const toast = useToast();

  const onSave = async () => {
    if (message) {
      if (account) {
        setisLoading(true);
        try {
          const data = await sendReport(message, account.id);

          if (data) {
            toast.show(report.reportSuccessMessage, {
              type: "success",
            });
            setMessage("");
            setError("");
            router.back();
          }
        } catch (error) {
          console.log(error);
        } finally {
          setisLoading(false);
        }
      }
    } else {
      setError(report.errorMessageRequired);
    }
  };

  return (
    <>
      <SafeAreaView className="bg-white dark:bg-dark-500 px-6 space-y-4 h-full ">
        <View>
          <TextArea
            title={report.messageTitle}
            onChange={setMessage}
            error={error}
            placeholder={report.messagePlaceholder}
            value={message}
          />
          <ErrorMessage error={error} />
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
              {report.confirmButton}
            </Text>
          </Button>
        </View>
      </SafeAreaView>
    </>
  );
};

export default ReportPage;
